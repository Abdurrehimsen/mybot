/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

module.exports = function(bp) {
  var respond = "";
  // Listens for a first message (this is a Regex)
  // GET_STARTED is the first message you get on Facebook Messenger
  bp.hear(/GET_STARTED|merhaba|merhabalar|test|hey|heyo|iyi günler/i, (event, next) => {
    event.reply('#welcome') // See the file `content.yml` to see the block
  })

  bp.hear(/randevu almak istiyorum|randevu istiyorum|randevu|randevu alacaktım|randevu talep edecektim/i
    , (event, next) => {
      
      // ad sorma
      bp.convo.start(event, convo => {
        convo.threads['default'].addQuestion('#askUserName', response => {
          convo.say('#askUserName_reply', { name: response.text })
          convo.next()
        })

        // yaş sorma
        convo.threads['default'].addQuestion('#askUserAge', [
          {
            pattern: /(\d+)/,
            callback: response => {
              convo.say('#askUserAge_reply', { age: response.match })
              convo.next()
            }
          },
          { 
            default: true, 
            callback: response => {
              convo.say('#askUserAge_miss')
              convo.repeat()
            }
          }
        ])

        // cinsiyet sorma
        convo.threads['default'].addQuestion('#askUserSex', response => {
          convo.say('#askUserSex_reply', { sex: response.text })
          convo.next()
        })
      
        // iş sorma
        convo.threads['default'].addQuestion('#askUserRequest', response => {
          convo.say('#askUserRequest_reply', { req: response.text })
          convo.next()
        })
            
    })
  })

  // You can also pass a matcher object to better filter events
  bp.hear({
    type: /message|text/i,
    text: /exit|bye|goodbye|quit|done|leave|stop/i
  }, (event, next) => {
    event.reply('#goodbye', {
      // You can pass data to the UMM bloc!
      reason: 'unknown'
    })
  })
}
