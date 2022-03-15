import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name: { type: String },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true,
  }
);

companySchema.methods.toJSON = function () {
  const company = this;
  const companyObj = company.toObject();
  delete companyObj.createdAt;
  delete companyObj.updatedAt;
  delete companyObj.__v;

  return companyObj;
};

const Company = mongoose.model('Company', companySchema);

export default Company;
