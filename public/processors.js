// This is "processor.js" file, evaluated in AudioWorkletGlobalScope upon
// audioWorklet.addModule() call in the main global scope.

const SMOOTHING_FACTOR = 0.8;
const FRAME_PER_SECOND = 60;
const FRAME_INTERVAL = 0 / FRAME_PER_SECOND;

class MyWorkletProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{
      name: 'myParam',
      defaultValue: 0.707
    }];
  }

  constructor() {
    super();
    this._lastUpdate = currentTime;
    this._volume = 0;
    this.port.onmessage = (event) => {
      // Handling data from the node.
      console.log("message from app to worker: " + event.data);
    };

    this.port.postMessage('Hi!');
  }

  calculateRMS(inputChannelData) {
    // Calculate the squared-sum.
    let sum = 0;
    for (let i = 0; i < inputChannelData.length; i++) {
      sum += inputChannelData[i] * inputChannelData[i];
    }

    // Calculate the RMS level and update the volume.
    let rms = Math.sqrt(sum / inputChannelData.length);
    this._volume = Math.max(rms, this._volume * SMOOTHING_FACTOR);
  }

  process(inputs, outputs, parameters) {
    // console.log({inputs, outputs, parameters})
    // audio processing code here.
    // The processor may have multiple inputs and outputs. Get the first input and
    // output.
    const input = inputs[0];
    // const output = outputs[0];

    // Each input or output may have multiple channels. Get the first channel.
    const inputChannel0 = input[0];
    // const outputChannel0 = output[0];

    // const myParamValues = parameters.myParam;
    if (inputChannel0 !== undefined) {
      if (currentTime - this._lastUpdate > FRAME_INTERVAL) {
        this.calculateRMS(inputChannel0);
        this.port.postMessage(this._volume);
        this._lastUpdate = currentTime;
      }


      // if (myParamValues.length === 1) {
      //   // |myParam| has been a constant value for the current render quantum,
      //   // which can be accessed by |myParamValues[0]|.
      //   for (let i = 0; i < inputChannel0.length; ++i) {
      //     outputChannel0[i] = inputChannel0[i] * myParamValues[0];
      //   }

      // } else {
      //   // |myParam| has been changed and |myParamValues| has 128 values.

      //   for (let i = 0; i < inputChannel0.length; ++i) {
      //     outputChannel0[i] = inputChannel0[i] * myParamValues[i];
      //   }
      // }
      // console.log({outputChannel0})

    }

    // To keep this processor alive.
    return true;
  }
}

registerProcessor('my-worklet-processor', MyWorkletProcessor);
