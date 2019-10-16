# Lorian Tech Test
RESTful endpoint `.../organisation` to Create (POST), Read (GET), Update (PUT) and Delete (DELETE) an organisation
of type:

```
{
  "_id": "<ObjectId()>",
  "name": "<string>",
  "founded": "<integer>",
  "revenue": {
    "currency": "<string>",
    "value": "<integer">"
  },
  "subsidairies": [
    {
      "name": "<string>",
      "founded": "<integer>",
      "revenue": {
        "currency": "<string>",
        "value": "<integer">"
      }
    },
    ...
  ]
}
```

## To Install
`npm install`

## To Run (locally)
Requires a MongoDB database with read/write role as defined in the ENV VAR `MONGODB_URI`, using mongodb+srv format
with the username/password embedded): "".

Because code is webpack/babel (which means it can support full ES6 constructs not yet fully available in node.js -
and certainly many of which are not available in V8 as restricted by lambda), you must be running `npm run dev`.

## Create Organisation
Edit `createOrganisation.js` to customise the organisation - note, will fail if organisation already exists:

```
MONGODB_URI='<your URI>' node ./local/createOrganisation.js
```

### Get Organisation
Edit `getOrganisation.js` to customise the organisation - note, will fail if organisation does not exist:

```
MONGODB_URI='<your URI>' node ./local/getOrganisation.js
```

### Update Organisation
Edit `updateOrganisation.js` to customise the organisation - note, will fail if organisation does not exist:

```
MONGODB_URI='<your URI>' node ./local/updateOrganisation.js
```

### Delete Organisation
Edit `deleteOrganisation.js` to customise the organisation - note, will fail if organisation does not exist:

```
MONGODB_URI='<your URI>' node ./local/deleteOrganisation.js
```

## To Test
`npm run test`

## To Deploy
serverless framework supports multiple environments; prefixed environment names defined within `package.json`.

Create a a local AWS credentials profile called "serverless-admin" - or run `./node_modules/.bin/sls config credentials --profile serverless-admin --provider aws --key <your AWS key>  --secret <your AWS secret>`. Ignore the missing MONGODB_URI env var warning here.

```
MONGODB_URI='<your URI>' npm run dev:deploy
```