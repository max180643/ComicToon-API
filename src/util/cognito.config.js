const CognitoExpress = require('cognito-express')
const dotenv = require('dotenv')

dotenv.config()

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_REGION,
  cognitoUserPoolId: process.env.COGNITO_USERPOOL_ID,
  tokenUse: 'access', // Possible Values: access | id (AccessToken | IDToken)
  tokenExpiration: 3600000 // Up to default expiration of 1 hour (3600000 ms)
})

module.exports = cognitoExpress
