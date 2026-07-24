import { Schema, model, models, Document } from "mongoose";

export interface IAIRequestLog extends Document {
  userId: string;
  createdAt: Date;
}

const AIRequestLogSchema = new Schema<IAIRequestLog>({
  userId: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

const AIRequestLog =
  models?.AIRequestLog ||
  model<IAIRequestLog>("AIRequestLog", AIRequestLogSchema);

export default AIRequestLog;
