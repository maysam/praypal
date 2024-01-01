import React, { useState, useEffect } from 'react';
import getUserMedia from 'get-user-media-promise';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, ResponsiveContainer } from 'recharts';

type Props = {
  started: boolean
}

const AudioAnalyzer: React.FC<Props> = (props: Props) => {
  const started = props.started
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volumes, setVolumes] = useState<{ v: number, v2: number }[]>([])
  const [message, setMessage] = useState("no message")
  useEffect(() => {
    if (started)
      audioContext?.resume()
    else
      audioContext?.suspend()
  }, [started])
  useEffect(() => {
    if (!started) return
    // Initialize the audio context
    const initAudioContext = async (started: boolean) => {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      console.log({ context, audioContext })
      console.log(context == audioContext)
      if (audioContext == null) {
        setAudioContext(context);
      }

      try {
        // Get user media (microphone)
        const mediaStream = await getUserMedia({ audio: true });
        const microphone = context.createMediaStreamSource(mediaStream);

        // Create a script processor node for real-time audio analysis

        await context.audioWorklet.addModule('processors.js')

        const node = new window.AudioWorkletNode(context, "my-worklet-processor");
        node.port.onmessage = (event) => {
          // Handling data from the processor.
          // console.log("message from node: " + event.data);
          setMessage(event.data)
          const volume = parseFloat(event.data)
          if (started && volume != 0)
            setVolumes(current => [...current, { v: volume * 1000, v2: current.length }])
        };

        // node.port.postMessage('Hello!');

        microphone.connect(node).connect(context.destination);
        context.resume()

      }
      catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    initAudioContext(started);

    // Cleanup when the component unmounts
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext, started]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart width={500} height={300} data={volumes}>
          {/* <XAxis dataKey="v2" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" /> */}
          <Line type="linear" dataKey="v" stroke="green" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AudioAnalyzer;
