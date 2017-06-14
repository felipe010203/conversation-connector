'use strict';

/**
 * Converts Slack channel-formatted JSON data into Conversation SDK formatted JSON input.
 *
 * @param  {JSON} params - input parameters in Slack's event subscription format
 * @return {JSON}        - JSON data formatted as input for Conversation SDK
 */
function main(params) {
  try {
    validateParameters(params);
  } catch (e) {
    return Promise.reject(e.message);
  }

  const conversationJson = {
    conversation: {
      input: {
        text: params.slack.event.text
      }
    },
    raw_data: {
      slack: params.slack
    }
  };

  return Promise.resolve(conversationJson);
}

/**
 * Validates the required parameters for running this action.
 *
 * @param  {JSON} params - the parameters passed into the action
 */
function validateParameters(params) {
  // Required: the provider must be known and supplied
  if (!params.provider || params.provider !== 'slack') {
    throw new Error("Provider not supplied or isn't Slack.");
  }
  // Required: JSON data for the channel provider must be supplied
  if (!params.slack) {
    throw new Error('Slack JSON data is missing.');
  }
}

module.exports = main;