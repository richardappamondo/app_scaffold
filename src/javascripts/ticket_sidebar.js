import $ from 'jquery';
import I18n from 'i18n';

class TicketSidebar {

  constructor(client, data) {
    this.client = client
    this._metadata = data.metadata
    this._context = data.context

    this.getCurrentUser().then((user) => {
      console.log("user: ", user)
    })

    this.getTicketRequesterId().then( (requesterId) => {
      this.client.request(`/api/v2/users/${requesterId}/tickets/requested.json?sort_by=created_at&sort_order=asc&per_page=5`).then( (ticketsData) => {

        this.displayTickets(ticketsData['tickets'])
      })
    })
  }

  getCurrentUser() {
    return this.client.request({ url: '/api/v2/users/me.json' })
  }

  getTicketRequesterId() {
    return this.client.get('ticket.requester').then( (response) => {
      return response['ticket.requester'].id
    })
  }

  displayTickets(tickets) {
    console.log("tickets: ",tickets)
    let ticketsForDisplay = ''

    tickets.forEach( (ticket) => {
      ticketsForDisplay = ticketsForDisplay.concat(
        `<tr class="_tooltip" data-title="${ticket.description}">
          <td><a href="#/tickets/${ticket.id}"><b>#${ticket.id}</b> ${ticket.subject}</a></td>

          <td class='status-cell'>
            <b class="status">
              ${I18n.t('global.status')}
            </b>

            ${I18n.t(ticket.status)}
          </td>
        </tr>
        `
      )
    })

    $('[data-main]').html(`
      <table class="table table-condensed">
        <tbody>${ticketsForDisplay}</tbody>
      </table>`)
  }
}

export default TicketSidebar
