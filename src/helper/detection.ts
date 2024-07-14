export async function getUsersCountry() {
  try {
    const response = await fetch(
      "https://api.ipgeolocation.io/ipgeo?apiKey=b921c07e5869442398bf44c1018135dc",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const country = data.country_name;

    return country;
  } catch (error: any) {
    console.log("FILE:detection.ts, ", error.message);
    return "Bangladesh";
  }
}

export function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
