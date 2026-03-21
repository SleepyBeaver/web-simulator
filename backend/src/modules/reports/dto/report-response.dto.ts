export class ReportResponseDto {
  id: string;
  modelId: string;
  versionId: string;

  model: {
    id: string;
    name: string;
    description?: string;
  };

  metrics: any;
  createdAt: Date;
}