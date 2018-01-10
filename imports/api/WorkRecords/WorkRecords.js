import { createCollection } from '../lib/collection-helpers.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Make it available to the rest of the app
const WorkRecords = createCollection("workrecords", Schemas.WorkRecordSchema);

export default WorkRecords;