import * as activations from '../../activations'
import Tensor from '../../Tensor'
import Layer from '../../Layer'
import { gemv } from 'ndarray-blas-level2'
import ops from 'ndarray-ops'
import cwise from 'cwise'

/**
 * LSTM layer class
 */
export default class LSTM extends Layer {
  /**
   * Creates a LSTM layer
   * @param {number} attrs.outputDim - output dimensionality
   * @param {number} [attrs.activation] - activation function
   * @param {number} [attrs.innerActivation] - inner activation function
   * @param {Object} [attrs] - layer attributes
   */
  constructor (attrs = {}) {
    super(attrs)
    this.layerClass = 'LSTM'

    const {
      outputDim = 1,
      activation = 'tanh',
      innerActivation = 'hardSigmoid'
    } = attrs

    this.outputDim = outputDim

    this.activation = activations[activation]
    this.innerActivation = activations[innerActivation]

    // Layer weights specification
    this.params = ['W_i', 'U_i', 'b_i', 'W_c', 'U_c', 'b_c', 'W_f', 'U_f', 'b_f', 'W_o', 'U_o', 'b_o']
  }

  _combine = cwise({
    args: ['array', 'array', 'array', 'array'],
    body: function (_y, _x1, _x2, _b) {
      _y = _x1 + _x2 + _b
    }
  })

  _update = cwise({
    args: ['array', 'array', 'array', 'array'],
    body: function (_c, _ctm1, _i, _f) {
      _c = _c * _i + _ctm1 * _f
    }
  })

  /**
   * Method for layer computational logic
   * @param {Tensor} x
   * @returns {Tensor} x
   */
  call (x) {
    let currentX = new Tensor([], [x.tensor.shape[1]])

    const dimInputGate = this.weights['b_i'].tensor.shape[0]
    const dimCandidate = this.weights['b_c'].tensor.shape[0]
    const dimForgetGate = this.weights['b_f'].tensor.shape[0]
    const dimOutputGate = this.weights['b_o'].tensor.shape[0]

    let currentInputGateState = new Tensor([], [dimInputGate])
    let tempXI = new Tensor([], [dimInputGate])
    let tempHI = new Tensor([], [dimInputGate])

    let currentForgetGateState = new Tensor([], [dimForgetGate])
    let tempXF = new Tensor([], [dimForgetGate])
    let tempHF = new Tensor([], [dimForgetGate])

    let currentOutputGateState = new Tensor([], [dimOutputGate])
    let tempXO = new Tensor([], [dimOutputGate])
    let tempHO = new Tensor([], [dimOutputGate])

    let currentCandidate = new Tensor([], [dimCandidate])
    let tempXC = new Tensor([], [dimCandidate])
    let tempHC = new Tensor([], [dimCandidate])
    let previousCandidate = new Tensor([], [dimCandidate])

    let currentHiddenState = new Tensor([], [dimCandidate])
    let previousHiddenState = new Tensor([], [dimCandidate])

    const _clearTemp = () => {
      const tempTensors = [tempXI, tempHI, tempXF, tempHF, tempXO, tempHO, tempXC, tempHC]
      tempTensors.forEach(temp => ops.assigns(temp.tensor, 0))
    }

    const _step = () => {
      ops.assign(previousHiddenState.tensor, currentHiddenState.tensor)

      gemv(1.0, this.weights['W_i'].tensor.transpose(1, 0), currentX.tensor, 1.0, tempXI.tensor)
      gemv(1.0, this.weights['U_i'].tensor.transpose(1, 0), previousHiddenState.tensor, 1.0, tempHI.tensor)
      this._combine(currentInputGateState.tensor, tempXI.tensor, tempHI.tensor, this.weights['b_i'].tensor)
      this.innerActivation(currentInputGateState)

      gemv(1.0, this.weights['W_f'].tensor.transpose(1, 0), currentX.tensor, 1.0, tempXF.tensor)
      gemv(1.0, this.weights['U_f'].tensor.transpose(1, 0), previousHiddenState.tensor, 1.0, tempHF.tensor)
      this._combine(currentForgetGateState.tensor, tempXF.tensor, tempHF.tensor, this.weights['b_f'].tensor)
      this.innerActivation(currentForgetGateState)

      gemv(1.0, this.weights['W_o'].tensor.transpose(1, 0), currentX.tensor, 1.0, tempXO.tensor)
      gemv(1.0, this.weights['U_o'].tensor.transpose(1, 0), previousHiddenState.tensor, 1.0, tempHO.tensor)
      this._combine(currentOutputGateState.tensor, tempXO.tensor, tempHO.tensor, this.weights['b_o'].tensor)
      this.innerActivation(currentOutputGateState)

      gemv(1.0, this.weights['W_c'].tensor.transpose(1, 0), currentX.tensor, 1.0, tempXC.tensor)
      gemv(1.0, this.weights['U_c'].tensor.transpose(1, 0), previousHiddenState.tensor, 1.0, tempHC.tensor)
      this._combine(currentCandidate.tensor, tempXC.tensor, tempHC.tensor, this.weights['b_c'].tensor)
      this.activation(currentCandidate)

      this._update(
        currentCandidate.tensor,
        previousCandidate.tensor,
        currentInputGateState.tensor,
        currentForgetGateState.tensor
      )

      ops.assign(previousCandidate.tensor, currentCandidate.tensor)

      this.activation(currentCandidate)
      ops.mul(currentHiddenState.tensor, currentOutputGateState.tensor, currentCandidate.tensor)
    }

    for (let i = 0, steps = x.tensor.shape[0]; i < steps; i++) {
      ops.assign(currentX.tensor, x.tensor.pick(i, null))
      _clearTemp()
      _step()
    }

    x.tensor = currentHiddenState.tensor

    return x
  }
}
