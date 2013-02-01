
### invoke

```javascript
documents.forEach( invoke('setState', 'saved') )
```

### invoke.async

```javascript
async.forEach( documents, invoke('save', 'redis'), function( err ){
  
})
```