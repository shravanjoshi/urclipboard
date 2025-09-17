import mongoose from "mongoose";

const clipSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  lifetime: {
    type: Number, // lifetime in seconds
  },
  expireAt: {
    type: Date,   // when the doc should expire
  },
}, { timestamps: true });

// TTL index on expireAt
clipSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// Pre-save hook to set expireAt automatically
clipSchema.pre("save", function (next) {
  console.log('pre run ', typeof this.lifetime);
  if (this.isNew && this.lifetime) {
    this.expireAt = new Date(this.createdAt.getTime() + this.lifetime * 1000);
  }
  next();
});

export const Clip = mongoose.model("Clip", clipSchema);
