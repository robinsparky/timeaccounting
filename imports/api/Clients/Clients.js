import { createCollection } from '../lib/collection-helpers.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Make it available to the rest of the app
const Clients = createCollection("clients", Schemas.ClientSchema);

export default Clients;