import React, { useState, useEffect } from 'react';
import getUserMedia from 'get-user-media-promise';
import detectPitch from 'pitchfinder';
type Props = {
  started: boolean
}
const AudioAnalyzer: React.FC<Props> = (props: Props) => {
  const started = props.started
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [pitch, setPitch] = useState<number | null>(null);

  useEffect(() => {
    if(!started){return}
    // Initialize the audio context
    const initAudioContext = async () => {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      console.log({context,audioContext})
      console.log(context==audioContext)
      if(audioContext == null) {
        setAudioContext(context);
      }

      try {
        // Get user media (microphone)
        const stream = await getUserMedia({ audio: true });
        const source = context.createMediaStreamSource(stream);

        // Create a script processor node for real-time audio analysis

        await context.audioWorklet.addModule('processors.js').then(() => {
          let node = new window.AudioWorkletNode(context, "my-worklet-processor");
          node.port.onmessage = (event) => {
            // Handling data from the processor.
            console.log(event.data);
          };

          node.port.postMessage('Hello!');
        })

        const scriptNode = context.createScriptProcessor(2048, 1, 1);
        source.connect(scriptNode);
        scriptNode.connect(context.destination);

        // Handle audio data and detect pitch
        scriptNode.onaudioprocess = (event) => {
          console.log(event)
          const samples = event.inputBuffer.getChannelData(0);
          const pitchValue = detectPitch.YIN()(samples);
          setPitch(pitchValue);
        };
      }
       catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    initAudioContext();

    // Cleanup when the component unmounts
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext, started]);

  return (
    <div>
      <p>{`Detected Pitch: ${pitch || 'N/A'}`}</p>
    </div>
  );
};

export default AudioAnalyzer;
