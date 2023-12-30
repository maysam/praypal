// This is "processor.js" file, evaluated in AudioWorkletGlobalScope upon
// audioWorklet.addModule() call in the main global scope.
class MyWorkletProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{
      name: 'myParam',
      defaultValue: 0.707
    }];
  }

  constructor() {
    super();
    this.port.onmessage = (event) => {
      // Handling data from the node.
      console.log(event.data);
    };

    this.port.postMessage('Hi!');
  }

  process(inputs, outputs, parameters) {
    console.log({inputs, outputs, parameters})
    // audio processing code here.
      // The processor may have multiple inputs and outputs. Get the first input and
  // output.
  const input = inputs[0];
  const output = outputs[0];

  // Each input or output may have multiple channels. Get the first channel.
  const inputChannel0 = input[0];
  const outputChannel0 = output[0];

  const myParamValues = parameters.myParam;
  this.port.postMessage('Hi again!');
  if(inputChannel0 !== undefined)
    if (myParamValues.length === 1) {
      // |myParam| has been a constant value for the current render quantum,
      // which can be accessed by |myParamValues[0]|.
      for (let i = 0; i < inputChannel0.length; ++i) {
        outputChannel0[i] = inputChannel0[i] * myParamValues[0];
      }

    } else {
      // |myParam| has been changed and |myParamValues| has 128 values.

      for (let i = 0; i < inputChannel0.length; ++i) {
        outputChannel0[i] = inputChannel0[i] * myParamValues[i];
      }
    }

    // To keep this processor alive.
    return true;
  }
}

registerProcessor('my-worklet-processor', MyWorkletProcessor);
