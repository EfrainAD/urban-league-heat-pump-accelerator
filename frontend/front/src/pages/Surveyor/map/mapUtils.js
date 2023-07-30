export const generateMapsLink = (locations) => {
  locations = locations.map((location) => location?.replace(" ", ""));

  // destination is the last place you go to in the list
  const waypoints = locations.slice(0, -1).join("|");
  const destination = locations.at(-1);

  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
};
