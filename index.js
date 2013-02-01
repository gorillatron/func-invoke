

module.exports = function( fn ) {
  var args = Array.prototype.slice.call(arguments, 1)
  return function( obj ) {
    return obj[ fn ].apply( obj, args.concat(Array.prototype.slice.call(arguments, 1)) )
  }
}

module.exports.async = function( fn ) {
  return function( obj, next ) {
    return obj[ fn ].call(obj, function( err ) {
      if( err )
        return next( err )
      next( null, Array.prototype.slice.call(arguments, 1) )
    })
  }
}