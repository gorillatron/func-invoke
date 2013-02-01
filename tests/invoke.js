var assert  = require( 'assert' ),
    async   = require( 'async' ),
    invoke  = require( '../index' )


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

    it('it should pass the parameters after the methodname to the returned function', function() {

      var getName = invoke('getName')

      assert.equal( getName(user, ' Trubadur', ' Pesci'), 'Joe Trubadur Pesci' )

    })

  })

  describe('async', function() {

    var avoke = invoke.async

    var users = []

    beforeEach(function() {

      function User( name ) {
        this.name = name
      }

      User.prototype.getName = function( cb ) {
        var name = this.name
        setTimeout(function() {
          cb( null, name )
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

    it('should', function() {
      
    })

  })

})