var assert  = require( 'assert' ),
    async   = require( 'async' ),
    invoke  = require( '../index' ),
    avoke   = invoke.async


describe('invoke.js', function() {



  describe('sync', function() {

    var user = { 
      name: 'Joe', 
      getName: function( concatstringA, concatstringB ) { 
        return this.name.concat( concatstringA || '' ) .concat( concatstringB || '' )
      } 
    }

    it('should return a method that invokes the specified methon on the object passed to returned method', function() {

      var getName = invoke('getName')

      assert.equal( getName(user), 'Joe' )

    })

    it('should partially apply the parameters passed after method name to the returned function', function() {

      var getExclaimedName = invoke('getName', '!')

      assert.equal( getExclaimedName(user), 'Joe!' )      

    })

    it('it should pass the parameters after the instance to the returned function', function() {

      var getName = invoke('getName')

      assert.equal( getName(user, ' Trubadur', ' Pesci'), 'Joe Trubadur Pesci' )

    })

  })



  describe('async', function() {

    var users = []

    beforeEach(function() {

      function User( name ) {
        this.name = name
      }

      User.prototype.setName = function( name, cb ) {
        var self = this
        setTimeout(function() {
          self.name = name
          cb( null )
        },1)
      }

      User.prototype.asyncError = function( cb ) {
        setTimeout(function() {
          cb( new Error('error instance') )
        },1)
      }

      users = []

      var i, count

      count = 3

      for (i = 1; i <= count; i++) {
        users.push( new User('user' + i) )
      }

    })

    it('should invoke the method asynchronoyusly', function( done ) {
      
      users.forEach( avoke('setName', 'newname') )

      setTimeout(function() {
        users.forEach(function( user ) {
          assert.equal( user.name, 'newname' )
        })
        done()
      }, 30)

    })

    it('run the callback in it is supplied', function() {

      var i = 0

      users.forEach( avoke('setName', 'name', function() {
        i++
      }))

      setTimeout(function() {
        assert.equal( i, 3 )
      },30)

    })

  })

})