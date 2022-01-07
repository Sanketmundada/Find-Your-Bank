export const BASE_URL = "https://vast-shore-74260.herokuapp.com/banks?city=";

export const FILTER_OPTIONS = [
  { label: "Bank Name", value: "bank_name" },
  { label: "IFSC", value: "ifsc" },
  { label: "Branch", value: "branch" },
];

export const CITY_LIST = [
  {
    label: "Mumbai",
    value: "MUMBAI",
  },
  {
    label: "Pune",
    value: "PUNE",
  },
  {
    label: "Bangalore",
    value: "BANGALORE",
  },
  {
    label: "Hyderabad",
    value: "HYDERABAD",
  },
  {
    label: "Chennai",
    value: "CHENNAI",
  },
];

export const columns = [
  {
    label: "Bank",
    value: "bank_name",
    style: { flex: "3" },
  },
  {
    label: "IFSC",
    value: "ifsc",
    style: { flex: "3" },
  },
  {
    label: "Branch",
    value: "branch",
    style: { flex: "2" },
  },
  {
    label: "Bank ID",
    value: "bank_id",
    style: { flex: "2" },
  },
  {
    label: "Address",
    value: "address",
    style: { flex: "3" },
  },
];
