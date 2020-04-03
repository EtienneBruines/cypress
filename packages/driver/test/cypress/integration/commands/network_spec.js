describe('src/cy/commands/network', () => {
  it('switches between offline and online', () => {
    cy.visit('/fixtures/network.html')

    cy.contains('We are currently online.')
    cy.network({ offline: true })
    cy.contains('We are currently offline.')
    cy.network({ offline: false })
    cy.contains('We are currently online.')
  })

  it('also disables service-worker network access', () => {
    cy.visit('/fixtures/network_sw.html')

    // Baseline when starting out
    cy.contains('We are currently online.')
    cy.contains('test-network')
    .click()

    cy.contains('The network-request was online.')
    cy.contains('The service-worker ping was online.')
    cy.contains('reset-test')
    .click()

    cy.contains('The network-request was .')
    cy.contains('The service-worker ping was .')

    // Toggle to offline
    cy.network({ offline: true })
    cy.contains('We are currently offline.')
    cy.contains('test-network')
    .click()

    cy.contains('The network-request was offline.')
    cy.contains('The service-worker ping was online.')
    cy.contains('reset-test')
    .click()

    cy.contains('The network-request was .')
    cy.contains('The service-worker ping was .')

    // Toggle back to online
    cy.network({ offline: false })
    cy.contains('We are currently online.')
    cy.contains('test-network')
    .click()

    cy.contains('The network-request was online.')
    cy.contains('The service-worker ping was online.')
  })
})
