import { Events } from '../support/pageObjects/events'
import Navbar from '../support/pageObjects/components/navbar'

describe('Filtering of events', () => {
  const events = new Events()

  before(() => {
    cy.visit(events.url)
  })

  it('toggles all events to active, inactive and back to all shows same sum of events', () => {
    const navbar = new Navbar()
    navbar.loginAsAdmin()

    let activeEvents = 0
    let cancelledEvents = 0

    events.getToggleActiveEvents().click()
    events.getEvents().then((elm) => {
      activeEvents = elm.length
    })
    cy.contains('Active events')

    events.getToggleActiveEvents().click()
    events.getEvents().then((elm) => {
      cancelledEvents = elm.length
    })
    cy.contains('Inactive events')

    events.getToggleActiveEvents().click()
    events.getEvents().then((elm) => assert.equal(elm.length, activeEvents + cancelledEvents))
  })

  it('finds the event by name', () => {
    let titleOfFirst = ''
    events
      .getFirstEvent()
      .get('#eventTitle')
      .then(($card) => {
        titleOfFirst = $card.text()
        events.getSearchBox().type(titleOfFirst)
      })

    events.getEvents().then((elm) => {
      assert.notEqual(elm.length, 0)
    })

    events.getSearchBox().type('cokkolwiek wiecej')
    cy.contains('No events found :(')

    events.getSearchBox().clear()
  })

  it('filters events for next two months from now by default', () => {
    const now = new Date()

    events.getCalendarFrom().should('have.value', now.toISOString().substring(0, 10))

    now.setMonth(now.getMonth() + 2) // set month value to next 2 months

    events.getCalendarTo().should('have.value', now.toISOString().substring(0, 10))
  })

  it('shows more events if date filter is cleared', () => {
    let eventsFilteredByDate = 0
    let allEvents = 0

    events.getEvents().then((elm) => {
      eventsFilteredByDate = elm.length
    })

    events.getCalendarFrom().clear()
    events.getCalendarTo().clear()

    events
      .getEvents()
      .then((elm) => {
        allEvents = elm.length
      })
      .then(() => {
        assert.isAbove(allEvents, eventsFilteredByDate)
      })
  })

  it('shows one event for the first event date', () => {
    let dateOfFirst = ''
    events
      .getFirstEvent()
      .get('#dateAndPlace')
      .then(($h1) => {
        dateOfFirst = $h1.text().substring(0, 10)
        events.getCalendarFrom().type(dateOfFirst)
        events.getCalendarTo().type(dateOfFirst)
      })

    events.getEvents().then((elm) => {
      assert.equal(elm.length, 1)
    })
  })

  it('shows no events for invalid date', () => {
    events.getCalendarFrom().type('2010-01-01')
    events.getCalendarTo().type('2000-01-01')

    cy.contains('No events found :(')

    events.getCalendarFrom().clear()
    events.getCalendarTo().clear()
  })
})
