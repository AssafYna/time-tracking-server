import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

projectSchema.methods.toJSON = function () {
  const project = this;
  const projectObj = project.toObject();
  delete projectObj.createdAt;
  delete projectObj.updatedAt;
  delete projectObj.__v;
  delete projectObj.workers;
  delete projectObj.projectManager;
  return projectObj;
};

const Project = mongoose.model('Project', projectSchema);

export default Project;
