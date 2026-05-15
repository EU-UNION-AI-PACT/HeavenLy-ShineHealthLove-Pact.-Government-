export interface Country {
  name: string;
  longName: string;
  capital: string;
  iso2: string;
  iso3: string;
  tld: string;
  population: number;
  englishName: string;
}

export const COUNTRIES: Country[] = [
  { name: "Afghanistan", longName: "Islamische Republik Afghanistan", capital: "Kabul", iso2: "AF", iso3: "AFG", tld: ".af", population: 42600000, englishName: "Afghanistan" },
  { name: "Ägypten", longName: "Arabische Republik Ägypten", capital: "Kairo", iso2: "EG", iso3: "EGY", tld: ".eg", population: 106300000, englishName: "Egypt" },
  { name: "Albanien", longName: "Republik Albanien", capital: "Tirana", iso2: "AL", iso3: "ALB", tld: ".al", population: 2800000, englishName: "Albania" },
  { name: "Algerien", longName: "Demokratische Volksrepublik Algerien", capital: "Algier", iso2: "DZ", iso3: "DZA", tld: ".dz", population: 47000000, englishName: "Algeria" },
  { name: "Andorra", longName: "Fürstentum Andorra", capital: "Andorra la Vella", iso2: "AD", iso3: "AND", tld: ".ad", population: 90000, englishName: "Andorra" },
  { name: "Angola", longName: "Republik Angola", capital: "Luanda", iso2: "AO", iso3: "AGO", tld: ".ao", population: 37900000, englishName: "Angola" },
  { name: "Argentinien", longName: "Argentinische Republik", capital: "Buenos Aires", iso2: "AR", iso3: "ARG", tld: ".ar", population: 47100000, englishName: "Argentina" },
  { name: "Armenien", longName: "Republik Armenien", capital: "Jerewan", iso2: "AM", iso3: "ARM", tld: ".am", population: 3000000, englishName: "Armenia" },
  { name: "Aserbaidschan", longName: "Republik Aserbaidschan", capital: "Baku", iso2: "AZ", iso3: "AZE", tld: ".az", population: 10200000, englishName: "Azerbaijan" },
  { name: "Äthiopien", longName: "Demokratische Bundesrepublik Äthiopien", capital: "Addis Abeba", iso2: "ET", iso3: "ETH", tld: ".et", population: 129700000, englishName: "Ethiopia" },
  { name: "Australien", longName: "Australien", capital: "Canberra", iso2: "AU", iso3: "AUS", tld: ".au", population: 27300000, englishName: "Australia" },
  { name: "Bahamas", longName: "Commonwealth der Bahamas", capital: "Nassau", iso2: "BS", iso3: "BHS", tld: ".bs", population: 400000, englishName: "Bahamas" },
  { name: "Bahrain", longName: "Königreich Bahrain", capital: "Manama", iso2: "BH", iso3: "BHR", tld: ".bh", population: 1600000, englishName: "Bahrain" },
  { name: "Bangladesch", longName: "Volksrepublik Bangladesch", capital: "Dhaka", iso2: "BD", iso3: "BGD", tld: ".bd", population: 173600000, englishName: "Bangladesh" },
  { name: "Barbados", longName: "Barbados", capital: "Bridgetown", iso2: "BB", iso3: "BRB", tld: ".bb", population: 300000, englishName: "Barbados" },
  { name: "Belarus", longName: "Republik Belarus", capital: "Minsk", iso2: "BY", iso3: "BLR", tld: ".by", population: 9100000, englishName: "Belarus" },
  { name: "Belgien", longName: "Königreich Belgien", capital: "Brüssel", iso2: "BE", iso3: "BEL", tld: ".be", population: 11800000, englishName: "Belgium" },
  { name: "Belize", longName: "Belize", capital: "Belmopan", iso2: "BZ", iso3: "BLZ", tld: ".bz", population: 400000, englishName: "Belize" },
  { name: "Bolivien", longName: "Plurinationaler Staat Bolivien", capital: "Sucre", iso2: "BO", iso3: "BOL", tld: ".bo", population: 12200000, englishName: "Bolivia" },
  { name: "Bosnien und Herzegowina", longName: "Bosnien und Herzegowina", capital: "Sarajevo", iso2: "BA", iso3: "BIH", tld: ".ba", population: 3200000, englishName: "Bosnia and Herzegovina" },
  { name: "Brasilien", longName: "Föderative Republik Brasilien", capital: "Brasília", iso2: "BR", iso3: "BRA", tld: ".br", population: 216400000, englishName: "Brazil" },
  { name: "Brunei", longName: "Brunei Darussalam", capital: "Bandar Seri Begawan", iso2: "BN", iso3: "BRN", tld: ".bn", population: 500000, englishName: "Brunei" },
  { name: "Bulgarien", longName: "Republik Bulgarien", capital: "Sofia", iso2: "BG", iso3: "BGR", tld: ".bg", population: 6200000, englishName: "Bulgaria" },
  { name: "Burkina Faso", longName: "Burkina Faso", capital: "Ouagadougou", iso2: "BF", iso3: "BFA", tld: ".bf", population: 23200000, englishName: "Burkina Faso" },
  { name: "Chile", longName: "Republik Chile", capital: "Santiago de Chile", iso2: "CL", iso3: "CHL", tld: ".cl", population: 19800000, englishName: "Chile" },
  { name: "China", longName: "Volksrepublik China", capital: "Peking", iso2: "CN", iso3: "CHN", tld: ".cn", population: 1412000000, englishName: "China" },
  { name: "Dänemark", longName: "Königreich Dänemark", capital: "Kopenhagen", iso2: "DK", iso3: "DNK", tld: ".dk", population: 5900000, englishName: "Denmark" },
  { name: "Deutschland", longName: "Bundesrepublik Deutschland", capital: "Berlin", iso2: "DE", iso3: "DEU", tld: ".de", population: 84700000, englishName: "Germany" },
  { name: "Finnland", longName: "Republik Finnland", capital: "Helsinki", iso2: "FI", iso3: "FIN", tld: ".fi", population: 5600000, englishName: "Finland" },
  { name: "Frankreich", longName: "Französische Republik", capital: "Paris", iso2: "FR", iso3: "FRA", tld: ".fr", population: 68400000, englishName: "France" },
  { name: "Ghana", longName: "Republik Ghana", capital: "Accra", iso2: "GH", iso3: "GHA", tld: ".gh", population: 34100000, englishName: "Ghana" },
  { name: "Griechenland", longName: "Hellenische Republik", capital: "Athen", iso2: "GR", iso3: "GRC", tld: ".gr", population: 10300000, englishName: "Greece" },
  { name: "Großbritannien", longName: "Vereinigtes Königreich Großbritannien und Nordirland", capital: "London", iso2: "GB", iso3: "GBR", tld: ".uk", population: 67700000, englishName: "United Kingdom" },
  { name: "Indien", longName: "Republik Indien", capital: "Neu-Delhi", iso2: "IN", iso3: "IND", tld: ".in", population: 1441700000, englishName: "India" },
  { name: "Indonesien", longName: "Republik Indonesien", capital: "Jakarta", iso2: "ID", iso3: "IDN", tld: ".id", population: 277500000, englishName: "Indonesia" },
  { name: "Irland", longName: "Irland", capital: "Dublin", iso2: "IE", iso3: "IRL", tld: ".ie", population: 5100000, englishName: "Ireland" },
  { name: "Israel", longName: "Staat Israel", capital: "Jerusalem", iso2: "IL", iso3: "ISR", tld: ".il", population: 9800000, englishName: "Israel" },
  { name: "Italien", longName: "Italienische Republik", capital: "Rom", iso2: "IT", iso3: "ITA", tld: ".it", population: 58800000, englishName: "Italy" },
  { name: "Japan", longName: "Japan", capital: "Tokio", iso2: "JP", iso3: "JPN", tld: ".jp", population: 124000000, englishName: "Japan" },
  { name: "Kanada", longName: "Kanada", capital: "Ottawa", iso2: "CA", iso3: "CAN", tld: ".ca", population: 39900000, englishName: "Canada" },
  { name: "Kenia", longName: "Republik Kenia", capital: "Nairobi", iso2: "KE", iso3: "KEN", tld: ".ke", population: 55100000, englishName: "Kenya" },
  { name: "Kolumbien", longName: "Republik Kolumbien", capital: "Bogotá", iso2: "CO", iso3: "COL", tld: ".co", population: 51900000, englishName: "Colombia" },
  { name: "Kroatien", longName: "Republik Kroatien", capital: "Zagreb", iso2: "HR", iso3: "HRV", tld: ".hr", population: 3900000, englishName: "Croatia" },
  { name: "Luxemburg", longName: "Großherzogtum Luxemburg", capital: "Luxemburg", iso2: "LU", iso3: "LUX", tld: ".lu", population: 700000, englishName: "Luxembourg" },
  { name: "Malaysia", longName: "Malaysia", capital: "Kuala Lumpur", iso2: "MY", iso3: "MYS", tld: ".my", population: 34300000, englishName: "Malaysia" },
  { name: "Mexiko", longName: "Vereinigte Mexikanische Staaten", capital: "Mexiko-Stadt", iso2: "MX", iso3: "MEX", tld: ".mx", population: 129200000, englishName: "Mexico" },
  { name: "Neuseeland", longName: "Neuseeland", capital: "Wellington", iso2: "NZ", iso3: "NZL", tld: ".nz", population: 5100000, englishName: "New Zealand" },
  { name: "Niederlande", longName: "Königreich der Niederlande", capital: "Amsterdam", iso2: "NL", iso3: "NLD", tld: ".nl", population: 17900000, englishName: "Netherlands" },
  { name: "Nigeria", longName: "Bundesrepublik Nigeria", capital: "Abuja", iso2: "NG", iso3: "NGA", tld: ".ng", population: 232700000, englishName: "Nigeria" },
  { name: "Norwegen", longName: "Königreich Norwegen", capital: "Oslo", iso2: "NO", iso3: "NOR", tld: ".no", population: 5400000, englishName: "Norway" },
  { name: "Österreich", longName: "Republik Österreich", capital: "Wien", iso2: "AT", iso3: "AUT", tld: ".at", population: 9100000, englishName: "Austria" },
  { name: "Pakistan", longName: "Islamische Republik Pakistan", capital: "Islamabad", iso2: "PK", iso3: "PAK", tld: ".pk", population: 245200000, englishName: "Pakistan" },
  { name: "Polen", longName: "Republik Polen", capital: "Warschau", iso2: "PL", iso3: "POL", tld: ".pl", population: 37700000, englishName: "Poland" },
  { name: "Portugal", longName: "Portugiesische Republik", capital: "Lissabon", iso2: "PT", iso3: "PRT", tld: ".pt", population: 10200000, englishName: "Portugal" },
  { name: "Rumänien", longName: "Rumänien", capital: "Bukarest", iso2: "RO", iso3: "ROU", tld: ".ro", population: 19000000, englishName: "Romania" },
  { name: "Russland", longName: "Russische Föderation", capital: "Moskau", iso2: "RU", iso3: "RUS", tld: ".ru", population: 144200000, englishName: "Russia" },
  { name: "Saudi-Arabien", longName: "Königreich Saudi-Arabien", capital: "Riad", iso2: "SA", iso3: "SAU", tld: ".sa", population: 36900000, englishName: "Saudi Arabia" },
  { name: "Schweden", longName: "Königreich Schweden", capital: "Stockholm", iso2: "SE", iso3: "SWE", tld: ".se", population: 10500000, englishName: "Sweden" },
  { name: "Schweiz", longName: "Schweizerische Eidgenossenschaft", capital: "Bern", iso2: "CH", iso3: "CHE", tld: ".ch", population: 8800000, englishName: "Switzerland" },
  { name: "Singapur", longName: "Republik Singapur", capital: "Singapur", iso2: "SG", iso3: "SGP", tld: ".sg", population: 5800000, englishName: "Singapore" },
  { name: "Slowakei", longName: "Slowakische Republik", capital: "Bratislava", iso2: "SK", iso3: "SVK", tld: ".sk", population: 5500000, englishName: "Slovakia" },
  { name: "Slowenien", longName: "Republik Slowenien", capital: "Ljubljana", iso2: "SI", iso3: "SVN", tld: ".si", population: 2100000, englishName: "Slovenia" },
  { name: "Spanien", longName: "Königreich Spanien", capital: "Madrid", iso2: "ES", iso3: "ESP", tld: ".es", population: 48600000, englishName: "Spain" },
  { name: "Südafrika", longName: "Republik Südafrika", capital: "Pretoria", iso2: "ZA", iso3: "ZAF", tld: ".za", population: 63600000, englishName: "South Africa" },
  { name: "Südkorea", longName: "Republik Korea", capital: "Seoul", iso2: "KR", iso3: "KOR", tld: ".kr", population: 51700000, englishName: "South Korea" },
  { name: "Tschechien", longName: "Tschechische Republik", capital: "Prag", iso2: "CZ", iso3: "CZE", tld: ".cz", population: 10900000, englishName: "Czech Republic" },
  { name: "Türkei", longName: "Republik Türkei", capital: "Ankara", iso2: "TR", iso3: "TUR", tld: ".tr", population: 85300000, englishName: "Turkey" },
  { name: "Ukraine", longName: "Ukraine", capital: "Kiew", iso2: "UA", iso3: "UKR", tld: ".ua", population: 37000000, englishName: "Ukraine" },
  { name: "Ungarn", longName: "Ungarn", capital: "Budapest", iso2: "HU", iso3: "HUN", tld: ".hu", population: 9600000, englishName: "Hungary" },
  { name: "USA", longName: "Vereinigte Staaten von Amerika", capital: "Washington D.C.", iso2: "US", iso3: "USA", tld: ".us", population: 335000000, englishName: "United States" },
  { name: "Venezuela", longName: "Bolivarische Republik Venezuela", capital: "Caracas", iso2: "VE", iso3: "VEN", tld: ".ve", population: 28800000, englishName: "Venezuela" },
  { name: "Vietnam", longName: "Sozialistische Republik Vietnam", capital: "Hanoi", iso2: "VN", iso3: "VNM", tld: ".vn", population: 98500000, englishName: "Vietnam" },
];

export function getCountryByIso2(iso2: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso2.toUpperCase() === iso2.toUpperCase());
}

export function getCountryByIso3(iso3: string): Country | undefined {
  return COUNTRIES.find((c) => c.iso3.toUpperCase() === iso3.toUpperCase());
}

export function sovereignIdPrefix(iso2: string, isJunior: boolean): string {
  return isJunior ? "ID-JNR-GLOB" : `ID-GLB-${iso2.toUpperCase()}`;
}
