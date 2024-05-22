export class NewUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  budget?: string;
  minBedrooms?: string;
  minBathrooms?: string;
  minArea?: string;

  agencyID?: string;
  isAgent?: boolean;
  commission?: string;
}
