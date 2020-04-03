module.exports = (Commands, Cypress) => {
  // Cypress.on('window:before:load', () => {
  //   return Cypress.automation('remote:debugger:protocol', {
  //     command: 'Target.setAutoAttach',
  //     params: {
  //       autoAttach: true,
  //       waitForDebuggerOnStart: true,
  //       flatten: true
  //     }
  //   }).then(() => Cypress.automation('remote:debugger:protocol', {
  //     command: 'Runtime.runIfWaitingForDebugger'
  //   }))
  // })

  Commands.addAll({
    network: (options = {}) => {
      // Updating individual targets is only required on Chrome, so let's only do so in Chrome
      // See https://bugs.chromium.org/p/chromium/issues/detail?id=1068544
      // The following is uncommented for future reference, in case the above crbug does not get resolved

      // const isChrome = Cypress.browser.family === 'chromium'
      // if (isChrome) {
      //   Cypress.automation('remote:debugger:protocol', {
      //     command: 'Target.getTargets',
      //   }).then(({ targetInfos }) => {
      //     const serviceWorkers = targetInfos.filter(info => info.type === 'service_worker' || info.type === 'worker')
      //
      //     return Promise.all(
      //       serviceWorkers.map(serviceWorker => {
      //       const targetId = serviceWorker.targetId
      //       return Cypress.automation('remote:debugger:protocol', {
      //         command: 'Target.attachToTarget',
      //         params: {
      //           targetId,
      //           flatten: true
      //         }
      //       }).then(({ sessionId }) => {
      //         Cypress.automation('remote:debugger:protocol', {
      //           command: 'Network.enable',
      //           sessionId,
      //         })
      //
      //         Cypress.automation('remote:debugger:protocol', {
      //           command: 'Network.emulateNetworkConditions',
      //           params: {
      //             offline: options.offline,
      //             'latency': 0,
      //             'downloadThroughput': 0,
      //             'uploadThroughput': 0,
      //             'connectionType': 'none',
      //           },
      //           sessionId,
      //         })
      //       })
      //     }))
      //   })
      // }

      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.enable',
      })

      return Cypress.automation('remote:debugger:protocol', {
        command: 'Network.emulateNetworkConditions',
        params: {
          offline: options.offline,
          'latency': 0,
          'downloadThroughput': 0,
          'uploadThroughput': 0,
          'connectionType': 'none',
        },
      })
    },
  })
}
