// TEST DATA
// Keyed by mocha test ID
// Python code for generating test data can be found in the matching jupyter notebook in folder `notebooks/`.

(function () {
  var DATA = {
    'core.MaxoutDense.0': {
      input: {
        data: [-0.992103, 0.024385, 0.625242, 0.225052, 0.443511, -0.416248],
        shape: [6]
      },
      weights: [
        {
          data: [0.542641, -0.958496, 0.267296, 0.497608, -0.002986, -0.550407, -0.603874, 0.521061, -0.661778, -0.82332, 0.37072, 0.906787, -0.992103, 0.024385, 0.625242, 0.225052, 0.443511, -0.416248, 0.835548, 0.429152, 0.085089, -0.71566, -0.253318, 0.348267, -0.116334, -0.131972, 0.235534, 0.026276, 0.300794, 0.202078, 0.610446, 0.043294, 0.817298, -0.361528, -0.819081, -0.3986, -0.772031, 0.657363, -0.906207, 0.252574, 0.095172, 0.638574, -0.602105, 0.713701, -0.296695, 0.509295, -0.408077, 0.767873, -0.348977, -0.669968, -0.214942, -0.813079, 0.642211, -0.697696, -0.231771, 0.888521, 0.975251, -0.087391, 0.652246, -0.497252, 0.194743, 0.805664, 0.069116, 0.180403, -0.921436, -0.285636, -0.840774, -0.38908, -0.338561, 0.547661, -0.920082, -0.141016],
          shape: [4, 6, 3]
        },
        {
          data: [0.542641, -0.958496, 0.267296, 0.497608, -0.002986, -0.550407, -0.603874, 0.521061, -0.661778, -0.82332, 0.37072, 0.906787],
          shape: [4, 3]
        }
      ],
      expected: {
        data: [0.090044, 0.227783, 0.435236],
        shape: [3]
      }
    },
    'core.MaxoutDense.1': {
      input: {
        data: [-0.104458, 0.101279, 0.94235, 0.864827, 0.681371, -0.745903],
        shape: [6]
      },
      weights: [
        {
          data: [-0.639461, -0.96105, -0.073563, 0.449868, -0.159593, -0.029146, -0.974438, -0.025257, 0.883613, 0.70159, 0.459929, -0.782528, 0.787808, 0.714308, -0.669827, 0.264668, -0.959033, -0.766525, -0.367265, -0.684175, 0.517959, 0.636551, -0.310751, -0.362402, -0.776678, -0.832094, 0.425452, 0.199087, -0.888653, -0.040405, -0.196647, 0.695958, 0.435698, 0.204128, 0.104768, 0.898205, 0.973347, -0.323892, -0.520251, 0.592872, -0.872627, -0.270769, -0.859954, -0.361265, -0.859235, -0.419473, 0.580202, 0.810801, 0.585243, 0.123637, 0.232037, -0.277033, -0.662365, -0.127518, 0.465651, -0.874225, -0.958534, 0.541096, -0.400096, 0.402329, 0.469335, 0.865809, -0.199343, -0.283124, 0.613134, 0.528982, 0.305229, 0.621933, 0.28443, 0.914888, -0.332251, 0.476505, 0.899667, -0.331272, 0.223264, -0.26866, -0.076919, -0.849996, -0.961313, 0.519299, -0.094482, 0.245668, 0.479903, -0.162673, -0.264765, -0.661942, 0.587745, 0.666075, 0.468426, 0.750589, 0.296113, 0.392132, -0.613964, 0.535264, -0.331834, -0.124082, -0.36226, 0.136579, 0.317385, 0.151117, -0.363626, -0.563993, 0.689877, -0.395671, -0.123559, -0.817171, -0.398042, -0.82861, -0.312573, 0.418602, 0.947937, 0.25045, -0.461393, 0.313418, 0.253996, 0.651304, 0.067388, 0.822243, -0.168993, -0.427911, 0.038015, 0.8449, 0.447823, -0.012174, -0.005007, 0.297444],
          shape: [7, 6, 3]
        }
      ],
      expected: {
        data: [1.043451, 2.068543, 0.396771],
        shape: [3]
      }
    }
  }

  window.TEST_DATA = Object.assign({}, window.TEST_DATA, DATA)
})()
