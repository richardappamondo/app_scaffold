import View from 'view'
// import Storage from 'storage'

// import $ from 'jquery';
// import _ from 'underscore';

class TicketSidebar {

  constructor(client, data) {
    this.client = client
    this._metadata = data.metadata
    this._context = data.context

    this.view = new View({ afterRender: () => {
      console.log('view loaded')
    }});

    this.getCurrentUser().then((user) => {
      console.log("user: ", user)
    })

    this.getTicketRequesterId().then( (requesterId) => {
      this.client.request(`/api/v2/users/${requesterId}/tickets/requested.json?sort_by=created_at&sort_order=asc`).then( (ticketsData) => {

        console.log("tickets: ",this.filterResults(ticketsData['tickets']))
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

  filterResults(tickets) {
    return tickets.slice(0, 5)
  }

  // function handleUserResults(data) {
  //   $('#main').render('lastfive',{
  //     lastestFiveArr: lastestFive
  //   });
  //   // change app size
  //   client.invoke('resize', { width: '100%', height: '170px'});
  // }
}

export default TicketSidebar
