import { createCollection } from '../lib/collection-helpers.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Make it available to the rest of the app
const Projects = createCollection("projects", Schemas.ProjectSchema);

export default Projects;