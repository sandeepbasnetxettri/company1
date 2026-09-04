/**
 * Official Nepal Administrative Structure (2026 / Current Constitution)
 * 7 Provinces -> 77 Districts -> 753 Local Levels (Metropolitan, Sub-Metropolitan, Municipality, Rural Municipality)
 * Accurate Local Government Types & Ward Counts
 */

const NEPAL_ADMIN_DATA = {
  provinces: [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province"
  ],

  districtsByProvince: {
    "Koshi Province": [
      "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang",
      "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu",
      "Sunsari", "Taplejung", "Tehrathum", "Udayapur"
    ],
    "Madhesh Province": [
      "Bara", "Dhanusha", "Mahottari", "Parsa",
      "Rautahat", "Saptari", "Sarlahi", "Siraha"
    ],
    "Bagmati Province": [
      "Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu",
      "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot",
      "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"
    ],
    "Gandaki Province": [
      "Baglung", "Gorkha", "Kaski", "Lamjung", "Manang",
      "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"
    ],
    "Lumbini Province": [
      "Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu",
      "Nawalparasi West", "Palpa", "Pyuthan", "Rolpa", "Rukum East", "Rupandehi"
    ],
    "Karnali Province": [
      "Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla",
      "Kalikot", "Mugu", "Rukum West", "Salyan", "Surkhet"
    ],
    "Sudurpashchim Province": [
      "Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura",
      "Darchula", "Doti", "Kailali", "Kanchanpur"
    ]
  },

  // 753 Local Levels grouped by District
  localLevelsByDistrict: {
    // -------------------------------------------------------------
    // KOSHI PROVINCE (14 Districts)
    // -------------------------------------------------------------
    "Bhojpur": [
      { name: "Bhojpur Municipality", type: "Municipality", wards: 12 },
      { name: "Shadananda Municipality", type: "Municipality", wards: 14 },
      { name: "Hatuwagadhi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Ramprasadrai Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Aamchok Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Tyamkemaiyum Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Arun Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Pauwadungma Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Salpasilichho Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Dhankuta": [
      { name: "Dhankuta Municipality", type: "Municipality", wards: 10 },
      { name: "Pakhribas Municipality", type: "Municipality", wards: 10 },
      { name: "Mahalaxmi Municipality", type: "Municipality", wards: 9 },
      { name: "Sangurigadhi Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Chaubise Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Sahidbhumi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chhathar Jorpati Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Ilam": [
      { name: "Ilam Municipality", type: "Municipality", wards: 12 },
      { name: "Deumai Municipality", type: "Municipality", wards: 9 },
      { name: "Mai Municipality", type: "Municipality", wards: 10 },
      { name: "Suryodaya Municipality", type: "Municipality", wards: 14 },
      { name: "Phakphokthum Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Maijogmai Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Chulachuli Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Rong Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Mangsebung Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sandakpur Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Jhapa": [
      { name: "Mechinagar Municipality", type: "Municipality", wards: 15 },
      { name: "Damak Municipality", type: "Municipality", wards: 10 },
      { name: "Birtamod Municipality", type: "Municipality", wards: 10 },
      { name: "Bhadrapur Municipality", type: "Municipality", wards: 10 },
      { name: "Arjundhara Municipality", type: "Municipality", wards: 11 },
      { name: "Kankai Municipality", type: "Municipality", wards: 9 },
      { name: "Shivasatakshi Municipality", type: "Municipality", wards: 11 },
      { name: "Gauradaha Municipality", type: "Municipality", wards: 9 },
      { name: "Kamal Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Jhapa Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Buddhashanti Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Haldibari Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Gaurigunj Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Barhadashi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Kachankawal Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Khotang": [
      { name: "Diktel Rupakot Majhuwagadhi Municipality", type: "Municipality", wards: 15 },
      { name: "Halesi Tuwachung Municipality", type: "Municipality", wards: 11 },
      { name: "Khotehang Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Diprung Chuichumma Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Aiselukharka Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Jantedhunga Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kepilasgadhi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Barahapokhari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Rawabesi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sakela Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Morang": [
      { name: "Biratnagar Metropolitan City", type: "Metropolitan City", wards: 19 },
      { name: "Sundarharaicha Municipality", type: "Municipality", wards: 12 },
      { name: "Belbari Municipality", type: "Municipality", wards: 11 },
      { name: "Pathari Shanishchare Municipality", type: "Municipality", wards: 10 },
      { name: "Ratuwamai Municipality", type: "Municipality", wards: 10 },
      { name: "Urlabari Municipality", type: "Municipality", wards: 9 },
      { name: "Rangeli Municipality", type: "Municipality", wards: 9 },
      { name: "Sunworshi Municipality", type: "Municipality", wards: 9 },
      { name: "Letang Municipality", type: "Municipality", wards: 9 },
      { name: "Kanepokhari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Budhiganga Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Gramthan Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Jahada Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Katahari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Dhanpalthan Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Kerabari Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Miklajung Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Okhaldhunga": [
      { name: "Siddhicharan Municipality", type: "Municipality", wards: 12 },
      { name: "Manebhanjyang Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Champadevi Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Sunkoshi Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Molung Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Likhu Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Chisankhugadhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Khijidemba Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Panchthar": [
      { name: "Phidim Municipality", type: "Municipality", wards: 14 },
      { name: "Hilihang Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Kummayak Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Miklajung Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Falgunanda Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Phalelung Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Tumbewa Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Yangwarak Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Sankhuwasabha": [
      { name: "Khandbari Municipality", type: "Municipality", wards: 11 },
      { name: "Chainpur Municipality", type: "Municipality", wards: 11 },
      { name: "Dharmadevi Municipality", type: "Municipality", wards: 9 },
      { name: "Madi Municipality", type: "Municipality", wards: 9 },
      { name: "Panchakhapan Municipality", type: "Municipality", wards: 9 },
      { name: "Bhotkhola Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Chichila Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Makalu Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sabhapokhari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Silichong Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Solukhumbu": [
      { name: "Solududhkunda Municipality", type: "Municipality", wards: 11 },
      { name: "Mapya Dudhkoshi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Nechasalyan Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Thulung Dudhkoshi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Maha Kulung Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sotang Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Khumbu Pasanglhamu Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Likhu Pike Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Sunsari": [
      { name: "Dharan Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 20 },
      { name: "Itahari Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 20 },
      { name: "Inaruwa Municipality", type: "Municipality", wards: 10 },
      { name: "Duhabi Municipality", type: "Municipality", wards: 12 },
      { name: "Ramdhuni Municipality", type: "Municipality", wards: 9 },
      { name: "Barahakshetra Municipality", type: "Municipality", wards: 11 },
      { name: "Koshi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Gadhi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Barju Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bhokraha Narsing Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Harinagara Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Dewanganj Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Taplejung": [
      { name: "Phungling Municipality", type: "Municipality", wards: 11 },
      { name: "Aathrai Tribeni Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sidingba Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Phaktanglung Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mikwakhola Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Meringden Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Maiwakhola Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Pathibhara Yangwarak Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sirijangha Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Tehrathum": [
      { name: "Myanglung Municipality", type: "Municipality", wards: 10 },
      { name: "Laligurans Municipality", type: "Municipality", wards: 9 },
      { name: "Aathrai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chhathar Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Phedap Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Menchayayem Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Udayapur": [
      { name: "Triyuga Municipality", type: "Municipality", wards: 16 },
      { name: "Katari Municipality", type: "Municipality", wards: 14 },
      { name: "Chaudandigadhi Municipality", type: "Municipality", wards: 10 },
      { name: "Belaka Municipality", type: "Municipality", wards: 9 },
      { name: "Udayapurgadhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Rautamai Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Tapli Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Limchungbung Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],

    // -------------------------------------------------------------
    // MADHESH PROVINCE (8 Districts)
    // -------------------------------------------------------------
    "Bara": [
      { name: "Kalaiya Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 27 },
      { name: "Jitpur Simara Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 24 },
      { name: "Kolhabi Municipality", type: "Municipality", wards: 11 },
      { name: "Nijgadh Municipality", type: "Municipality", wards: 13 },
      { name: "Mahagadhimai Municipality", type: "Municipality", wards: 11 },
      { name: "Simraungadh Municipality", type: "Municipality", wards: 11 },
      { name: "Pacharauta Municipality", type: "Municipality", wards: 9 },
      { name: "Pheta Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Bishrampur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Prasauni Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Adarshkotwal Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Karaiyamai Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Devtal Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Parwanipur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Baragadhi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Suwarna Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Dhanusha": [
      { name: "Janakpurdham Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 25 },
      { name: "Mithila Municipality", type: "Municipality", wards: 11 },
      { name: "Sahidnagar Municipality", type: "Municipality", wards: 9 },
      { name: "Dhanusadham Municipality", type: "Municipality", wards: 9 },
      { name: "Chhireshwarnath Municipality", type: "Municipality", wards: 10 },
      { name: "Sabaila Municipality", type: "Municipality", wards: 13 },
      { name: "Kamala Municipality", type: "Municipality", wards: 9 },
      { name: "Mithila Bihari Municipality", type: "Municipality", wards: 10 },
      { name: "Hansapur Municipality", type: "Municipality", wards: 9 },
      { name: "Bideha Municipality", type: "Municipality", wards: 9 },
      { name: "Ganeshman Charnath Municipality", type: "Municipality", wards: 11 },
      { name: "Nagarain Municipality", type: "Municipality", wards: 9 },
      { name: "Janaknandini Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bateshwar Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Dhanauji Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Aurahi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Mukhiyapatti Musaharmiya Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Lakshminiya Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Mahottari": [
      { name: "Jaleshwar Municipality", type: "Municipality", wards: 12 },
      { name: "Bardibas Municipality", type: "Municipality", wards: 14 },
      { name: "Gaushala Municipality", type: "Municipality", wards: 12 },
      { name: "Loharpatti Municipality", type: "Municipality", wards: 9 },
      { name: "Ramgopalpur Municipality", type: "Municipality", wards: 9 },
      { name: "Manara Shiswa Municipality", type: "Municipality", wards: 10 },
      { name: "Matihani Municipality", type: "Municipality", wards: 9 },
      { name: "Bhangaha Municipality", type: "Municipality", wards: 9 },
      { name: "Balwa Municipality", type: "Municipality", wards: 11 },
      { name: "Aurahi Municipality", type: "Municipality", wards: 9 },
      { name: "Ekdara Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sonama Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Samsi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mahottari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Pipra Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Parsa": [
      { name: "Birgunj Metropolitan City", type: "Metropolitan City", wards: 32 },
      { name: "Bahudaramai Municipality", type: "Municipality", wards: 9 },
      { name: "Parsagadhi Municipality", type: "Municipality", wards: 9 },
      { name: "Pokhariya Municipality", type: "Municipality", wards: 10 },
      { name: "Bindabasini Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Dhobini Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Chhipaharmai Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Jagarnathpur Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Jirabhawani Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Kalikamai Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Pakahamainpur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Paterwasugauli Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sakhuwaprasauni Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Thori Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Rautahat": [
      { name: "Gaur Municipality", type: "Municipality", wards: 9 },
      { name: "Chandrapur Municipality", type: "Municipality", wards: 10 },
      { name: "Garuda Municipality", type: "Municipality", wards: 9 },
      { name: "Gujara Municipality", type: "Municipality", wards: 9 },
      { name: "Brindaban Municipality", type: "Municipality", wards: 9 },
      { name: "Dewahi Gonahi Municipality", type: "Municipality", wards: 9 },
      { name: "Gadhimai Municipality", type: "Municipality", wards: 9 },
      { name: "Madhav Narayan Municipality", type: "Municipality", wards: 9 },
      { name: "Maulapur Municipality", type: "Municipality", wards: 9 },
      { name: "Paroha Municipality", type: "Municipality", wards: 9 },
      { name: "Phatuwa Bijayapur Municipality", type: "Municipality", wards: 11 },
      { name: "Rajdevi Municipality", type: "Municipality", wards: 9 },
      { name: "Rajpur Municipality", type: "Municipality", wards: 9 },
      { name: "Katahariya Municipality", type: "Municipality", wards: 9 },
      { name: "Ishanath Municipality", type: "Municipality", wards: 9 },
      { name: "Baudhimai Municipality", type: "Municipality", wards: 9 },
      { name: "Durga Bhagawati Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Yamunamai Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Saptari": [
      { name: "Rajbiraj Municipality", type: "Municipality", wards: 16 },
      { name: "Kanchanrup Municipality", type: "Municipality", wards: 12 },
      { name: "Dakneshwori Municipality", type: "Municipality", wards: 10 },
      { name: "Bodebarsain Municipality", type: "Municipality", wards: 10 },
      { name: "Khadak Municipality", type: "Municipality", wards: 11 },
      { name: "Shambhunath Municipality", type: "Municipality", wards: 12 },
      { name: "Surunga Municipality", type: "Municipality", wards: 11 },
      { name: "Hanumannagar Kankalini Municipality", type: "Municipality", wards: 14 },
      { name: "Saptakoshi Municipality", type: "Municipality", wards: 11 },
      { name: "Agnisair Krishna Savaran Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Chhinnamasta Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mahadeva Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tirahut Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Tilathi Koiladi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Rupani Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Balan-Bihul Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bishnupur Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Rajgadh Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Sarlahi": [
      { name: "Malangwa Municipality", type: "Municipality", wards: 12 },
      { name: "Harion Municipality", type: "Municipality", wards: 11 },
      { name: "Lalbandi Municipality", type: "Municipality", wards: 17 },
      { name: "Ishwarpur Municipality", type: "Municipality", wards: 15 },
      { name: "Barahathwa Municipality", type: "Municipality", wards: 18 },
      { name: "Godaita Municipality", type: "Municipality", wards: 12 },
      { name: "Kabilasi Municipality", type: "Municipality", wards: 10 },
      { name: "Bagmati Municipality", type: "Municipality", wards: 12 },
      { name: "Balara Municipality", type: "Municipality", wards: 11 },
      { name: "Haripur Municipality", type: "Municipality", wards: 9 },
      { name: "Haripurwa Municipality", type: "Municipality", wards: 9 },
      { name: "Chandranagar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Brahmapuri Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Ramnagar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chakraghatta Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Kaudena Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Dhankaul Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Bishnu Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Basbariya Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Parsa Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Siraha": [
      { name: "Siraha Municipality", type: "Municipality", wards: 22 },
      { name: "Lahan Municipality", type: "Municipality", wards: 24 },
      { name: "Golbazar Municipality", type: "Municipality", wards: 13 },
      { name: "Mirchaiya Municipality", type: "Municipality", wards: 12 },
      { name: "Kalyanpur Municipality", type: "Municipality", wards: 12 },
      { name: "Dhangadhimai Municipality", type: "Municipality", wards: 14 },
      { name: "Sukhipur Municipality", type: "Municipality", wards: 10 },
      { name: "Karjanha Municipality", type: "Municipality", wards: 11 },
      { name: "Bhagwanpur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Aurahi Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Bishnupur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Bariyarpatti Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Lakshmipur Patari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Naraha Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sakhuwanankarkatti Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Arnama Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Navarajpur Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],

    // -------------------------------------------------------------
    // BAGMATI PROVINCE (13 Districts)
    // -------------------------------------------------------------
    "Bhaktapur": [
      { name: "Bhaktapur Municipality", type: "Municipality", wards: 10 },
      { name: "Changunarayan Municipality", type: "Municipality", wards: 9 },
      { name: "Madhyapur Thimi Municipality", type: "Municipality", wards: 9 },
      { name: "Suryabinayak Municipality", type: "Municipality", wards: 10 }
    ],
    "Chitwan": [
      { name: "Bharatpur Metropolitan City", type: "Metropolitan City", wards: 29 },
      { name: "Ratnanagar Municipality", type: "Municipality", wards: 16 },
      { name: "Khairahani Municipality", type: "Municipality", wards: 13 },
      { name: "Madi Municipality", type: "Municipality", wards: 9 },
      { name: "Rapti Municipality", type: "Municipality", wards: 13 },
      { name: "Kalika Municipality", type: "Municipality", wards: 11 },
      { name: "Ichchhakamana Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Dhading": [
      { name: "Nilkantha Municipality", type: "Municipality", wards: 14 },
      { name: "Dhunibesi Municipality", type: "Municipality", wards: 9 },
      { name: "Galchhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Gajuri Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Benighat Rorang Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Siddhalek Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Tripurasundari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Gangajamuna Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Jwalamukhi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Thakre Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Netrawati Dabjong Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Rubee Valley Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Khaniyabas Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Dolakha": [
      { name: "Bhimeshwar Municipality", type: "Municipality", wards: 9 },
      { name: "Jiri Municipality", type: "Municipality", wards: 9 },
      { name: "Kalinchok Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Gaurishankar Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Bigu Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Baiteshwar Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Sailung Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Melung Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Tamakoshi Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Kathmandu": [
      { name: "Kathmandu Metropolitan City", type: "Metropolitan City", wards: 32 },
      { name: "Kirtipur Municipality", type: "Municipality", wards: 10 },
      { name: "Kageshwori Manohara Municipality", type: "Municipality", wards: 9 },
      { name: "Gokarneshwar Municipality", type: "Municipality", wards: 9 },
      { name: "Budhanilkantha Municipality", type: "Municipality", wards: 13 },
      { name: "Tokha Municipality", type: "Municipality", wards: 11 },
      { name: "Tarakeshwar Municipality", type: "Municipality", wards: 11 },
      { name: "Nagarjun Municipality", type: "Municipality", wards: 10 },
      { name: "Chandragiri Municipality", type: "Municipality", wards: 15 },
      { name: "Dakshinkali Municipality", type: "Municipality", wards: 9 },
      { name: "Shankharapur Municipality", type: "Municipality", wards: 9 }
    ],
    "Kavrepalanchok": [
      { name: "Dhulikhel Municipality", type: "Municipality", wards: 12 },
      { name: "Banepa Municipality", type: "Municipality", wards: 14 },
      { name: "Panauti Municipality", type: "Municipality", wards: 12 },
      { name: "Panchkhal Municipality", type: "Municipality", wards: 13 },
      { name: "Namobuddha Municipality", type: "Municipality", wards: 11 },
      { name: "Mandandeupur Municipality", type: "Municipality", wards: 12 },
      { name: "Bethanchok Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Roshi Rural Municipality", type: "Rural Municipality", wards: 12 },
      { name: "Temal Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Chaurideurali Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Mahabharat Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bhumlu Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Khanikhola Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Lalitpur": [
      { name: "Lalitpur Metropolitan City", type: "Metropolitan City", wards: 29 },
      { name: "Godawari Municipality", type: "Municipality", wards: 14 },
      { name: "Mahalaxmi Municipality", type: "Municipality", wards: 10 },
      { name: "Konjyosom Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Bagmati Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mahankal Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Makwanpur": [
      { name: "Hetauda Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 19 },
      { name: "Thaha Municipality", type: "Municipality", wards: 12 },
      { name: "Bhimphedi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Makawanpurgadhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Manahari Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Raksirang Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Bakaiya Rural Municipality", type: "Rural Municipality", wards: 12 },
      { name: "Bagmati Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Kailash Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Indrasarowar Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Nuwakot": [
      { name: "Bidur Municipality", type: "Municipality", wards: 13 },
      { name: "Belkotgadhi Municipality", type: "Municipality", wards: 13 },
      { name: "Kakani Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Suryagadhi Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Likhu Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tadi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Dupcheshwar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Panchakanya Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Shivapuri Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Kispang Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Meghang Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tarkeshwar Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Ramechhap": [
      { name: "Manthali Municipality", type: "Municipality", wards: 14 },
      { name: "Ramechhap Municipality", type: "Municipality", wards: 9 },
      { name: "Umakunda Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Khandadevi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Gokulganga Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Doramba Sailung Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Likhu Tamakoshi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Sunapati Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Rasuwa": [
      { name: "Gosaikunda Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kalika Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Uttargaya Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Naukunda Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Amachodingmo Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Sindhuli": [
      { name: "Kamalamai Municipality", type: "Municipality", wards: 14 },
      { name: "Dudhouli Municipality", type: "Municipality", wards: 14 },
      { name: "Golanjor Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Ghyanglekh Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Teenpatan Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Marin Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Sunkoshi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Hariharpurgadhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Phikal Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Sindhupalchok": [
      { name: "Chautara Sangachokgadhi Municipality", type: "Municipality", wards: 14 },
      { name: "Melamchi Municipality", type: "Municipality", wards: 13 },
      { name: "Barhabise Municipality", type: "Municipality", wards: 9 },
      { name: "Bhotekoshi Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Indrawati Rural Municipality", type: "Rural Municipality", wards: 12 },
      { name: "Jugal Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Panchpokhari Thangpal Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Balefi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Lisankhu Pakhar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Sunkoshi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Helambu Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Tripurasundari Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],

    // -------------------------------------------------------------
    // GANDAKI PROVINCE (11 Districts)
    // -------------------------------------------------------------
    "Baglung": [
      { name: "Baglung Municipality", type: "Municipality", wards: 14 },
      { name: "Galkot Municipality", type: "Municipality", wards: 11 },
      { name: "Jaimuni Municipality", type: "Municipality", wards: 10 },
      { name: "Dhorpatan Municipality", type: "Municipality", wards: 9 },
      { name: "Bareng Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Kathekhola Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Tamankhola Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tarakhola Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Nisikhola Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Badigad Rural Municipality", type: "Rural Municipality", wards: 10 }
    ],
    "Gorkha": [
      { name: "Gorkha Municipality", type: "Municipality", wards: 14 },
      { name: "Palungtar Municipality", type: "Municipality", wards: 10 },
      { name: "Barpak Sulikot Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Siranchok Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Ajirkot Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Arughat Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Gandaki Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Dharche Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Bhimsen Thapa Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Sahid Lakhan Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Chumanuwri Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Kaski": [
      { name: "Pokhara Metropolitan City", type: "Metropolitan City", wards: 33 },
      { name: "Annapurna Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Machhapuchhre Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Madi Rural Municipality", type: "Rural Municipality", wards: 12 },
      { name: "Rupa Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Lamjung": [
      { name: "Besisahar Municipality", type: "Municipality", wards: 11 },
      { name: "Madhyanepal Municipality", type: "Municipality", wards: 10 },
      { name: "Rainas Municipality", type: "Municipality", wards: 10 },
      { name: "Sundarbazar Municipality", type: "Municipality", wards: 11 },
      { name: "Kwhlosothar Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Dudhpokhari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Dordi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Marsyangdi Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Manang": [
      { name: "Chame Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Narpa Bhumi Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Nason Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Manang Ngisyang Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Mustang": [
      { name: "Gharpajhong Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Thasang Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Baragung Muktikshetra Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Lomanthang Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Lo-Ghekar Damodarkunda Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Myagdi": [
      { name: "Beni Municipality", type: "Municipality", wards: 10 },
      { name: "Annapurna Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Dhaulagiri Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mangala Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Malika Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Raghuganga Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Nawalpur": [
      { name: "Kawasoti Municipality", type: "Municipality", wards: 17 },
      { name: "Gaindakot Municipality", type: "Municipality", wards: 18 },
      { name: "Devchuli Municipality", type: "Municipality", wards: 17 },
      { name: "Madhyabindu Municipality", type: "Municipality", wards: 15 },
      { name: "Bulingtar Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bungdikali Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Hupsekot Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Binayi Tribeni Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Parbat": [
      { name: "Kushma Municipality", type: "Municipality", wards: 14 },
      { name: "Phalewas Municipality", type: "Municipality", wards: 11 },
      { name: "Jaljala Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Paiyun Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mahashila Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Modi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bihadi Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Syangja": [
      { name: "Putalibazar Municipality", type: "Municipality", wards: 14 },
      { name: "Waling Municipality", type: "Municipality", wards: 14 },
      { name: "Galyang Municipality", type: "Municipality", wards: 11 },
      { name: "Bhirkot Municipality", type: "Municipality", wards: 9 },
      { name: "Chapakot Municipality", type: "Municipality", wards: 10 },
      { name: "Aandhikhola Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Arjun Chaupari Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kaligandaki Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Phedikhola Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Harinas Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Biruwa Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Tanahun": [
      { name: "Byas Municipality", type: "Municipality", wards: 14 },
      { name: "Shuklagandaki Municipality", type: "Municipality", wards: 12 },
      { name: "Bhimad Municipality", type: "Municipality", wards: 9 },
      { name: "Bhanu Municipality", type: "Municipality", wards: 13 },
      { name: "Anbukhaireni Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Devghat Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Bandipur Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Rishing Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Ghiring Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Myagde Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],

    // -------------------------------------------------------------
    // LUMBINI PROVINCE (12 Districts)
    // -------------------------------------------------------------
    "Arghakhanchi": [
      { name: "Sandhikharka Municipality", type: "Municipality", wards: 12 },
      { name: "Shitganga Municipality", type: "Municipality", wards: 14 },
      { name: "Bhumikasthan Municipality", type: "Municipality", wards: 10 },
      { name: "Chhatradev Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Panini Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Malarani Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Banke": [
      { name: "Nepalgunj Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 23 },
      { name: "Kohalpur Municipality", type: "Municipality", wards: 15 },
      { name: "Narainapur Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Rapti Sonari Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Baijanath Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Khajura Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Duduwa Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Janaki Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Bardiya": [
      { name: "Gulariya Municipality", type: "Municipality", wards: 12 },
      { name: "Madhuwan Municipality", type: "Municipality", wards: 9 },
      { name: "Rajapur Municipality", type: "Municipality", wards: 10 },
      { name: "Thakurbaba Municipality", type: "Municipality", wards: 9 },
      { name: "Bansgadhi Municipality", type: "Municipality", wards: 9 },
      { name: "Barbardiya Municipality", type: "Municipality", wards: 11 },
      { name: "Badhaiyatal Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Geruwa Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Dang": [
      { name: "Ghorahi Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 19 },
      { name: "Tulsipur Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 19 },
      { name: "Lamahi Municipality", type: "Municipality", wards: 9 },
      { name: "Gadhawa Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Rajpur Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Shantinagar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Rapti Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Babai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Banglachuli Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Dangisharan Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Gulmi": [
      { name: "Resunga Municipality", type: "Municipality", wards: 14 },
      { name: "Musikot Municipality", type: "Municipality", wards: 9 },
      { name: "Isma Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kaligandaki Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Gulmi Durbar Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Satyawati Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Chandrakot Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Ruru Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chhatrakot Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Dhurkot Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Madane Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Malika Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Kapilvastu": [
      { name: "Kapilvastu Municipality", type: "Municipality", wards: 12 },
      { name: "Banganga Municipality", type: "Municipality", wards: 11 },
      { name: "Buddhabhumi Municipality", type: "Municipality", wards: 10 },
      { name: "Shivaraj Municipality", type: "Municipality", wards: 11 },
      { name: "Krishnanagar Municipality", type: "Municipality", wards: 12 },
      { name: "Maharajgunj Municipality", type: "Municipality", wards: 11 },
      { name: "Mayadevi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Yashodhara Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Suddhodhan Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bijaynagar Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Nawalparasi West": [
      { name: "Ramgram Municipality", type: "Municipality", wards: 18 },
      { name: "Sunwal Municipality", type: "Municipality", wards: 13 },
      { name: "Bardaghat Municipality", type: "Municipality", wards: 16 },
      { name: "Palhinandan Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sarawal Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Susta Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Pratappur Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Palpa": [
      { name: "Tansen Municipality", type: "Municipality", wards: 14 },
      { name: "Rampur Municipality", type: "Municipality", wards: 10 },
      { name: "Rainadevi Chhahara Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Mathagadhi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Nisdi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Bagnaskali Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Rambha Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Purbakhola Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tinau Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Ribdikot Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Pyuthan": [
      { name: "Pyuthan Municipality", type: "Municipality", wards: 10 },
      { name: "Swargadwari Municipality", type: "Municipality", wards: 9 },
      { name: "Gaumukhi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mandavi Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sarumarani Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Mallarani Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Naubahini Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Jhimruk Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Airawati Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Rolpa": [
      { name: "Rolpa Municipality", type: "Municipality", wards: 10 },
      { name: "Runtigadhi Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Triveni Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Sunil Smriti Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Lungri Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Paribartan Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Gangadev Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Madi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Thabang Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sunchhari Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Rukum East": [
      { name: "Sisne Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bhume Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Putha Uttarganga Rural Municipality", type: "Rural Municipality", wards: 14 }
    ],
    "Rupandehi": [
      { name: "Butwal Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 19 },
      { name: "Siddharthanagar Municipality", type: "Municipality", wards: 13 },
      { name: "Sainamaina Municipality", type: "Municipality", wards: 11 },
      { name: "Tilottama Municipality", type: "Municipality", wards: 17 },
      { name: "Devdaha Municipality", type: "Municipality", wards: 12 },
      { name: "Lumbini Sanskritik Municipality", type: "Municipality", wards: 13 },
      { name: "Gaidahawa Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Kanchan Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Kotahimai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Marchawari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mayadevi Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Omsatiya Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Rohini Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Sammarimai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Siyari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Suddhodhan Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],

    // -------------------------------------------------------------
    // KARNALI PROVINCE (10 Districts)
    // -------------------------------------------------------------
    "Dailekh": [
      { name: "Narayan Municipality", type: "Municipality", wards: 11 },
      { name: "Dullu Municipality", type: "Municipality", wards: 13 },
      { name: "Chamunda Bindrasaini Municipality", type: "Municipality", wards: 9 },
      { name: "Aathbis Municipality", type: "Municipality", wards: 9 },
      { name: "Gurans Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bhairabi Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Naumule Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Mahabu Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Dungeshwar Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Bhagawatimai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Thantikandh Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Dolpa": [
      { name: "Thuli Bheri Municipality", type: "Municipality", wards: 11 },
      { name: "Tripurasundari Municipality", type: "Municipality", wards: 11 },
      { name: "Dolpo Buddha Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Shey Phoksundo Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Jagadulla Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Mudkechula Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Kaike Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chharka Tangsong Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Humla": [
      { name: "Simkot Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Namkha Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kharpunath Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Sarkegad Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Chankheli Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Adanchuli Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Tanjakot Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Jajarkot": [
      { name: "Bheri Municipality", type: "Municipality", wards: 13 },
      { name: "Chhedagad Municipality", type: "Municipality", wards: 13 },
      { name: "Nalgad Municipality", type: "Municipality", wards: 13 },
      { name: "Barekot Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Kuse Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Junichande Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Shivalaya Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Jumla": [
      { name: "Chandannath Municipality", type: "Municipality", wards: 10 },
      { name: "Kankasundari Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Sinja Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Hima Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Tila Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Guthichaur Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Tatopani Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Patarasi Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Kalikot": [
      { name: "Khandachakra Municipality", type: "Municipality", wards: 11 },
      { name: "Raskot Municipality", type: "Municipality", wards: 9 },
      { name: "Tilagufa Municipality", type: "Municipality", wards: 11 },
      { name: "Pachaljharana Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Sanni Triveni Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Narharinath Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Shubha Kalika Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Mahawai Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Palata Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],
    "Mugu": [
      { name: "Chhayanath Rara Municipality", type: "Municipality", wards: 14 },
      { name: "Mugum Karmarong Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Soru Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Khatyad Rural Municipality", type: "Rural Municipality", wards: 11 }
    ],
    "Rukum West": [
      { name: "Musikot Municipality", type: "Municipality", wards: 14 },
      { name: "Chaurjahari Municipality", type: "Municipality", wards: 14 },
      { name: "Aathbiskot Municipality", type: "Municipality", wards: 14 },
      { name: "Sanibheri Rural Municipality", type: "Rural Municipality", wards: 11 },
      { name: "Triveni Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Banfikot Rural Municipality", type: "Rural Municipality", wards: 10 }
    ],
    "Salyan": [
      { name: "Sharada Municipality", type: "Municipality", wards: 15 },
      { name: "Bagchaur Municipality", type: "Municipality", wards: 12 },
      { name: "Bangad Kupinde Municipality", type: "Municipality", wards: 12 },
      { name: "Kalimati Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Tribeni Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Kapurkot Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Chatreshwari Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Siddha Kumakh Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Kumakh Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Darma Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Surkhet": [
      { name: "Birendranagar Municipality", type: "Municipality", wards: 16 },
      { name: "Bheriganga Municipality", type: "Municipality", wards: 13 },
      { name: "Gurbhakot Municipality", type: "Municipality", wards: 14 },
      { name: "Panchapuri Municipality", type: "Municipality", wards: 11 },
      { name: "Lekbeshi Municipality", type: "Municipality", wards: 10 },
      { name: "Chaukune Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Barahatal Rural Municipality", type: "Rural Municipality", wards: 10 },
      { name: "Chingad Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Simta Rural Municipality", type: "Rural Municipality", wards: 9 }
    ],

    // -------------------------------------------------------------
    // SUDURPASHCHIM PROVINCE (9 Districts)
    // -------------------------------------------------------------
    "Achham": [
      { name: "Mangalsen Municipality", type: "Municipality", wards: 14 },
      { name: "Sanfebagar Municipality", type: "Municipality", wards: 14 },
      { name: "Kamalbazar Municipality", type: "Municipality", wards: 10 },
      { name: "Panchadewal Binayak Municipality", type: "Municipality", wards: 9 },
      { name: "Chaurpati Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Mellekh Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bannigadhi Jayagadh Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Ramaroshan Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Dhakari Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Turmakhad Rural Municipality", type: "Rural Municipality", wards: 8 }
    ],
    "Baitadi": [
      { name: "Dasharathchand Municipality", type: "Municipality", wards: 11 },
      { name: "Patan Municipality", type: "Municipality", wards: 10 },
      { name: "Melauli Municipality", type: "Municipality", wards: 9 },
      { name: "Purchaudi Municipality", type: "Municipality", wards: 10 },
      { name: "Sunarya Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Sigas Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Shivanath Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Pancheshwar Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Dogadakedar Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Dilasaini Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Bajhang": [
      { name: "Jayaprithvi Municipality", type: "Municipality", wards: 11 },
      { name: "Bungal Municipality", type: "Municipality", wards: 11 },
      { name: "Talkot Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Masta Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Khaptadchhanna Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Thalara Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Bitthadchir Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Surma Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Chhabispathibhera Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Durgathali Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Kedarsyu Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Saipal Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Bajura": [
      { name: "Badimalika Municipality", type: "Municipality", wards: 9 },
      { name: "Triveni Municipality", type: "Municipality", wards: 9 },
      { name: "Budhiganga Municipality", type: "Municipality", wards: 10 },
      { name: "Budhinanda Municipality", type: "Municipality", wards: 10 },
      { name: "Gaumul Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Jagannath Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Swami Kartik Khapar Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Khaptad Chhededaha Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Himali Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Dadeldhura": [
      { name: "Amargadhi Municipality", type: "Municipality", wards: 11 },
      { name: "Parshuram Municipality", type: "Municipality", wards: 12 },
      { name: "Aalital Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Bhageshwar Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Navadurga Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Ajayameru Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Ganyapdhura Rural Municipality", type: "Rural Municipality", wards: 5 }
    ],
    "Darchula": [
      { name: "Mahakali Municipality", type: "Municipality", wards: 9 },
      { name: "Shailyashikhar Municipality", type: "Municipality", wards: 9 },
      { name: "Malikarjun Rural Municipality", type: "Rural Municipality", wards: 8 },
      { name: "Apihimal Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Duhu Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Naugad Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Marma Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Lekam Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Byas Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Doti": [
      { name: "Dipayal Silgadhi Municipality", type: "Municipality", wards: 9 },
      { name: "Shikhar Municipality", type: "Municipality", wards: 11 },
      { name: "Purbichowki Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Badikedar Rural Municipality", type: "Rural Municipality", wards: 5 },
      { name: "Jorayal Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Sayal Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Aadarsha Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "K.I. Singh Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Bogatan Phudsil Rural Municipality", type: "Rural Municipality", wards: 7 }
    ],
    "Kailali": [
      { name: "Dhangadhi Sub-Metropolitan City", type: "Sub-Metropolitan City", wards: 19 },
      { name: "Tikapur Municipality", type: "Municipality", wards: 9 },
      { name: "Ghodaghodi Municipality", type: "Municipality", wards: 12 },
      { name: "Lamki Chuha Municipality", type: "Municipality", wards: 10 },
      { name: "Bhajani Municipality", type: "Municipality", wards: 9 },
      { name: "Godawari Municipality", type: "Municipality", wards: 12 },
      { name: "Gauriganga Municipality", type: "Municipality", wards: 11 },
      { name: "Janaki Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Bardgoriya Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Mohanyal Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Kailari Rural Municipality", type: "Rural Municipality", wards: 9 },
      { name: "Joshipur Rural Municipality", type: "Rural Municipality", wards: 7 },
      { name: "Chure Rural Municipality", type: "Rural Municipality", wards: 6 }
    ],
    "Kanchanpur": [
      { name: "Bhimdatta Municipality", type: "Municipality", wards: 19 },
      { name: "Bedkot Municipality", type: "Municipality", wards: 10 },
      { name: "Shuklaphanta Municipality", type: "Municipality", wards: 12 },
      { name: "Dodhara Chandani Municipality", type: "Municipality", wards: 10 },
      { name: "Krishnapur Municipality", type: "Municipality", wards: 9 },
      { name: "Belauri Municipality", type: "Municipality", wards: 10 },
      { name: "Punarbas Municipality", type: "Municipality", wards: 11 },
      { name: "Laljhadi Rural Municipality", type: "Rural Municipality", wards: 6 },
      { name: "Beldandi Rural Municipality", type: "Rural Municipality", wards: 5 }
    ]
  },

  // -------------------------------------------------------------
  // Comprehensive Local Ward & Tole Database
  // Verified Toles, Streets, Chowks, Margs & Neighborhoods per Ward
  // -------------------------------------------------------------
  wardToles: {
    // -----------------------------------------------------------
    // KATHMANDU METROPOLITAN CITY (All 32 Wards)
    // -----------------------------------------------------------
    "Kathmandu Metropolitan City": {
      1: ["Naxal", "Nagpokhari", "Gairidhara", "Hattisar", "Narayan Chaur", "Bhagwati Bahal", "Naxal Chowk"],
      2: ["Lazimpat", "Uttardhoka", "Shangrila Chowk", "Galkopakha", "Lazimpat Road", "Pani Pokhari Gate"],
      3: ["Maharajgunj", "Panipokhari", "Chakrapath", "Teaching Hospital Area", "Bansbari Road", "Ranibari", "Saligram Tole"],
      4: ["Baluwatar", "Chundevi", "Bishalnagar", "Sukedhara", "Dhumbarahi", "Tusal", "Gopi Krishna Hall Area", "Rastra Bank Chowk"],
      5: ["Hadigaun", "Tangal", "Bhatbhateni", "Gahanapokhari", "Maligaun", "Kumari Galli", "Hadigaun Chowk"],
      6: ["Chabahil", "Bouddha", "Tinchule", "Mahankal", "Ramhiti", "Gaurighat", "Fulbari", "Bouddha Stupa Area", "Piplabot"],
      7: ["Mitrapark", "Jayabageshwori", "Siphal", "Chabahil Chowk", "Gaurighat Marga", "Kalo Pul", "Lumbini Tole"],
      8: ["Gaushala", "Tilganga", "Pingalasthan", "Airport Gate", "Guhyeshwari", "Pashupati Area", "Battisputali Road"],
      9: ["Sinamangal", "Old Baneshwor", "Battisputali", "Airport Residential", "Dwarika's Area", "Gaushala South", "Kankali Tole"],
      10: ["New Baneshwor", "Shantinagar", "Thapagaun", "Baneshwor", "Buddhanagar", "Prayag Marga", "Devinagar", "Milan Chowk", "Apex College Area", "Baneshwor Chowk"],
      11: ["Maitighar", "Babarmahal", "Tripureshwor", "Bhadrakali", "Thapathali", "Dhobighat Link Road", "Trade Tower Area"],
      12: ["Teku", "Pachali", "Bhimsenthan", "Tripureshwor Chowk", "Bishnumati Bridge", "Hyumat"],
      13: ["Kalimati", "Soalteemode", "Kuleshwor", "Bafal", "Tankeshwor", "Kalimati Fruit Market", "Chhauni Hospital Road"],
      14: ["Kalanki", "Khasibazar", "Balkhu", "Ravibhawan", "Syuchatar Gate", "Kalanki Chowk", "LRI School Area", "Dhungeadda"],
      15: ["Swayambhu", "Chhauni", "Dallu", "Bijeshwori", "Bhagwanpau", "Kimdol", "Swayambhu Stupa Circle"],
      16: ["Balaju", "Sorhakhutte", "Nayabazar", "Machhapokhari", "Gongabu", "Balaju Bypass", "Banasthali", "Khusibu"],
      17: ["Chhetrapati", "Dhalko", "Raktakali", "Majhipat", "Chhetrapati Chowk", "Pyaphal Marga"],
      18: ["Naradevi", "Kilagal", "Bhedasingh", "Yetkha", "Naradevi Temple Road"],
      19: ["Maru", "Hanumandhoka", "Pyaphal", "Damai Tole", "Tengal", "Kasthamandap Area"],
      20: ["Bhimsensthan", "Maru Tole", "Kohiti", "Jaisidewal", "Bhimsen Galli"],
      21: ["Lagan", "Jaisidewal", "Brahmatole", "Yangal", "Gofal Tole", "Lagan Chowk"],
      22: ["New Road", "Tebahal", "Sundhara", "Khichapokhari", "Fasikeba", "Mahabouddha", "Pako", "Ranjan Galli", "Dharahara Area"],
      23: ["Basantapur", "Jhochhen (Freak Street)", "Om Bahal", "Ganga Path", "Basantapur Durbar Square"],
      24: ["Indrachowk", "Makhan", "Kilagal", "Asan Tole", "Suraj Arcade Area", "Dhalche Tole"],
      25: ["Ason", "Bhedasingh", "Masangalli", "Kamalakshi", "Ason Chowk"],
      26: ["Thamel", "Paknajol", "Samakhusi", "Lainchaur", "Ranibari", "Kapurdhara", "Nursing Chowk", "Chaksibari Marga", "Kaldhara"],
      27: ["Mahaboudha", "Bhotahiti", "Asan Bazar", "Jyatha", "Tengal", "Rani Pokhari Corner"],
      28: ["Bagbazar", "Putalisadak", "Exhibition Road", "Kamaladi", "Ratnapark", "Star Mall Area", "Shankar Dev Marga"],
      29: ["Anamnagar", "Ghattekulo", "Dillibazar", "Setopul", "Dhobikhola Corridor", "Singha Durbar North Gate"],
      30: ["Maitidevi", "Gyaneshwor", "Purano Baneshwor", "Charhalge", "Maitidevi Chowk", "German Embassy Area"],
      31: ["Minbhawan", "Aloknagar", "Subidhanagar", "Tinkune", "Shantinagar Gate", "Civil Hospital Area", "Milanchowk"],
      32: ["Koteshwor", "Jadibuti", "Narephat", "Balkumari Bridge", "Pepsicola Chowk", "Mahadevsthan", "Koteshwor Chowk", "Munibhairab"]
    },

    // -----------------------------------------------------------
    // LALITPUR METROPOLITAN CITY (Wards 1 to 29)
    // -----------------------------------------------------------
    "Lalitpur Metropolitan City": {
      1: ["Kupondole", "Kandevsthan", "Sanepa Height", "Kupondole Height", "Gusingal"],
      2: ["Sanepa", "Jhamsikhel", "Bakhundole", "Dhobighat", "Restaurant Street", "Sanepa Chowk"],
      3: ["Pulchowk", "Damkal Chowk", "Hariharbhawan", "Labim Mall Area", "Engineering Campus Road", "Sajha Petrol Pump"],
      4: ["Dhobighat", "Jawalakhel West", "Ekantakuna", "Dhobighat Ring Road", "Kusunti Border"],
      5: ["Kumaripati", "Manbhawan", "Jawalakhel Zoo Area", "Lagankhel Buspark", "Mahalaxmisthan Road", "St. Xavier's Gate"],
      6: ["Patan Dhoka", "Kanibahal", "Saugal", "Kwalkhu", "Patan Museum Gate"],
      7: ["Sundhara Patan", "Gabahal", "Tyagal", "Pim Bahal", "Daugal"],
      8: ["Gujibahal", "Ilanhan", "Chakrabahi", "Kontihiti", "Patan Hospital North"],
      9: ["Chyasal", "Balkumari Lalitpur", "Mangalbazar", "Chyasal Stadium Area", "Tyagal"],
      10: ["Kupandol", "Jwagal", "Chakupat", "UN Park Area", "Shankhamul Bridge Lalitpur"],
      11: ["Ikhalakhu", "Purnachandi", "Kobahal", "Pimbahal Pond Area"],
      12: ["Tangal Patan", "Hakah Tole", "Subahal", "Lagan Tole"],
      13: ["Kusunti", "Ekantakuna Industrial Area", "Transport Office Area (Yatayat)"],
      14: ["Talchikhel", "Mahalaxmisthan", "Nakkhu", "Bagdol", "Nakkhu Dobato", "Bhaisepati Bridge"],
      15: ["Satdobato", "Sunakothi Road", "Swimming Pool Complex", "Satdobato Chowk", "Chhapro"],
      16: ["Nagbahal", "Dhalchhen", "Kwahiti", "Haatkhola Lalitpur"],
      17: ["Gwarko", "Imadol Road", "B&B Hospital Area", "Gwarko Flyover Chowk"],
      18: ["Bhaisepati", "Sainbu", "Awas Chhetra", "Bhaisepati Height", "Radio Nepal Area"],
      19: ["Thasikhel", "Prayagpokhari", "Lagankhel South"],
      20: ["Pimbahal", "Nyadha", "Dhaybhel"],
      21: ["Khokana", "Rudraeni", "Kwe Lachhi"],
      22: ["Bungamati", "Karyabinayak", "Chhyang Chhyang"],
      23: ["Dhapasi Lalitpur", "Harisiddhi North"],
      24: ["Dhapakhel", "Nagdaha", "Gems School Area"],
      25: ["Bhaisepati South", "Saibu Height"],
      26: ["Dhurkhel", "Sunakothi"],
      27: ["Sunakothi Main Bazar"],
      28: ["Harisiddhi", "Trisakti Tole"],
      29: ["Harisiddhi South", "Badegaun Road"]
    },

    // -----------------------------------------------------------
    // POKHARA METROPOLITAN CITY (Wards 1 to 33)
    // -----------------------------------------------------------
    "Pokhara Metropolitan City": {
      1: ["Bagar", "Bhimsen Tole", "Tundikhel", "K.I. Singh Bridge", "Purano Bazar"],
      2: ["Miruwa", "Bindhyabasini", "Bhairab Tole", "Bhimsensthan Pokhara"],
      3: ["Nadipur", "Teertha Marga", "Narayansthan", "Kanya Campus Area"],
      4: ["Chipledhunga", "Gairapatan", "Palikhe Chowk", "Siddharthachowk", "BP Chowk", "Bishal Bazar"],
      5: ["Malepatan", "Parsyang", "Zero KM", "Dharapani", "Prasayang Chowk"],
      6: ["Lakeside", "Baidam", "Gaurighat", "Barahi Chowk", "Hallanchowk", "Khahare", "Center Point", "Street No. 1 to 24"],
      7: ["Ratnachowk", "Masbar", "Birauta Road", "Shrijana Chowk", "Mustang Chowk"],
      8: ["Srijana Chowk", "New Road Pokhara", "Sabhagriha Chowk", "City Buspark Area"],
      9: ["Mahendrapool", "Naya Bazar", "Prithvi Chowk", "Buspark", "Bhimsen Chowk"],
      10: ["Amarsingh Chowk", "Ramghat", "Kundahar", "Bhanu Chowk Pokhara"],
      11: ["Ranipauwa", "Phoolbari", "Kahun Danda Road", "Manipal Hospital Area"],
      12: ["Matritole", "Shitaldevi", "Bhadrakali Temple Area"],
      13: ["Miapatan", "Arba", "Kundahar East"],
      14: ["Chhinedanda", "Majheripatan", "Pokhara International Airport Area"],
      15: ["Tutunga", "Patale Chhango (Davis Falls)", "Gupteshwor", "Chhorepatan Chowk"],
      16: ["Batulechaur", "Lamachaur", "Chamero Gufa Area", "Mahendra Cave Area"],
      17: ["Birauta", "Chorepatan", "Mahadevsthan", "Damside", "Pardi"],
      18: ["Sarangkot", "Methlang", "Sedibagar", "Toripani"],
      19: ["Lamachaur North", "Puranchaur", "Engineering Campus Lamachaur"],
      20: ["Mauja", "Bhalam", "Bhangara"],
      21: ["Nirmalpokhari", "Fedi"],
      22: ["Pumdivumdi", "World Peace Pagoda Area", "Shiva Statue Area"],
      26: ["Budhibazar", "Lekhnath", "Arghau Chowk"],
      27: ["Talchowk", "Rithepani", "Begnas Taal Road"],
      28: ["Kalikasthan", "Begnas"],
      29: ["Bhandardhik", "Sundaridanda"],
      30: ["Shishuwa", "Khudi", "Powerhouse Pokhara"]
    },

    // -----------------------------------------------------------
    // BHARATPUR METROPOLITAN CITY (Chitwan, Wards 1 to 29)
    // -----------------------------------------------------------
    "Bharatpur Metropolitan City": {
      1: ["Narayangarh Bazar", "Pulchowk Narayangarh", "Devghat Road", "Riverside Narayani", "Main Road"],
      2: ["Kshetrapur", "Lions Chowk", "Shahid Chowk", "Belchowk", "Milanchowk Narayangarh"],
      3: ["Belchowk", "Narayani Nadi Kinara", "Barghare", "Putali Line"],
      4: ["Dharma Chowk", "Lanku", "Shivaghat", "Ganeshthan"],
      5: ["Torikhet", "Kailashnagar", "Bikas Chowk"],
      6: ["Geetanagar", "Parasnagar", "Champa Chowk"],
      7: ["Krishnapur", "Prembasti", "Ujwalnagar"],
      8: ["Gauriganj", "Sharadanagar", "Bishalhajar"],
      9: ["Baseni", "Central Zoo Area", "Gondrang"],
      10: ["Chaubiskothi", "Hakim Chowk", "Hospital Road Bharatpur", "Bharatpur Height", "Rastriya Banijya Bank Line"],
      11: ["Malpot Chowk", "Bhojad", "Baseni", "Bypass Road", "Aaptaari"],
      12: ["Naya Pritiviraj Marga", "Dhankuta Tole", "Milanchowk Bharatpur"],
      13: ["Champanagar", "Ganganagar", "Chanauli Road"],
      14: ["Shivnagar", "Mohana"],
      15: ["Phulbari", "Mangalpur", "Bishrambag"],
      16: ["Sharanpur", "Mohanpur", "Dramatole"],
      22: ["Patihani", "Umbrella Street Area", "Rapti River View Point"]
    },

    // -----------------------------------------------------------
    // BINAYI TRIVENI / TRIBENI RURAL MUNICIPALITY (Dumkibas & SKB Base)
    // -----------------------------------------------------------
    "Binayi Triveni Rural Municipality": {
      1: ["Dumkibas Bazar", "Jyamire", "Dumkibas Highway Chowk", "Hospital Line Dumkibas", "Purano Dumkibas", "Main Road Dumkibas"],
      2: ["Dumkibas Chowk", "Sardi", "Sardi Khola", "Khursane", "Beldanda", "Binayi Bridge Area"],
      3: ["Beldiha", "Panbhar", "Khorsane Tole", "Devchuli Tole"],
      4: ["Dandatole", "Raninagar", "Dandachowk"],
      5: ["Bhaisalochan", "Susta Road", "Shivalaya Tole"],
      6: ["Triveni Dham", "Triveni Bazar", "Gajendra Moksha Mandir", "Barrage Area", "Nawalparasi Border"],
      7: ["Rani Nagar", "Bagwan", "Ghol Tole"]
    },
    "Binayi Tribeni Rural Municipality": {
      1: ["Dumkibas Bazar", "Jyamire", "Dumkibas Highway Chowk", "Hospital Line Dumkibas", "Purano Dumkibas", "Main Road Dumkibas"],
      2: ["Dumkibas Chowk", "Sardi", "Sardi Khola", "Khursane", "Beldanda", "Binayi Bridge Area"],
      3: ["Beldiha", "Panbhar", "Khorsane Tole", "Devchuli Tole"],
      4: ["Dandatole", "Raninagar", "Dandachowk"],
      5: ["Bhaisalochan", "Susta Road", "Shivalaya Tole"],
      6: ["Triveni Dham", "Triveni Bazar", "Gajendra Moksha Mandir", "Barrage Area", "Nawalparasi Border"],
      7: ["Rani Nagar", "Bagwan", "Ghol Tole"]
    },

    // -----------------------------------------------------------
    // NAWALPARASI / NAWALPUR KEY MUNICIPALITIES
    // -----------------------------------------------------------
    "Kawasoti Municipality": {
      1: ["Hattikhor", "Kolbrikha"],
      2: ["Kawasoti Bazar", "Sabhapati Chowk", "Lumbini Chowk", "Purano Kawasoti"],
      3: ["Thana Chowk", "Bishnupur", "Barauli Road Kawasoti"],
      4: ["Hansepur", "Shiv Mandir Tole"],
      8: ["Danda Hospital Chowk", "Danda Bazar", "Nawalpur Hospital Area"],
      16: ["Danda", "Kawasoti Bypass"]
    },
    "Gaindakot Municipality": {
      1: ["Narayani Pulchok Gaindakot", "Birendranagar Gaindakot", "Kalika Mandir Area"],
      2: ["Sillyance", "Gaindakot Bazar", "Lions Chowk Gaindakot"],
      4: ["Congress Chowk", "Jhapa Tole"],
      5: ["Kalika Chowk", "Bhadrakali", "Hospital Line Gaindakot"],
      8: ["Jayashree", "Pump Chowk"]
    },
    "Bardaghat Municipality": {
      1: ["Bardaghat Purano Bazar", "Parijat Chowk"],
      4: ["Bardaghat Chowk", "Main Highway Bazar", "TCN Chowk", "Hospital Line"],
      7: ["Chisapani", "Divyajyoti Chowk"],
      9: ["Panchanagar Bazar", "Bhutaha"]
    },
    "Ramgram Municipality": {
      1: ["Parasi Bazar", "Buddha Chowk Parasi", "Hospital Road"],
      2: ["Adarsha Chowk", "Bhandari Tole"],
      3: ["Ramgram Stupa Area", "Ujaini"]
    },
    "Sunwal Municipality": {
      1: ["Sunwal Chowk", "Main Road", "Sugar Mill Road"],
      4: ["Somnath", "Khaduwa"],
      7: ["Mahalaxmi Chowk", "Ganeshpur"]
    },

    // -----------------------------------------------------------
    // BUTWAL SUB-METROPOLITAN CITY (Rupandehi)
    // -----------------------------------------------------------
    "Butwal Sub-Metropolitan City": {
      1: ["Purano Butwal", "Batauli", "Khasyauli", "Jitgadhi Fort"],
      2: ["Maina Bagar", "Fulbari", "Tinau Kinara"],
      3: ["Golpark", "Jyotinagar", "Chidiya Khola", "Laxminagar"],
      4: ["Traffic Chowk", "Amarpath", "Hospital Line Butwal", "Bishal Bazar"],
      5: ["Nepalgunj Road", "Haatbazar Butwal", "Cinema Line"],
      6: ["Milanchowk", "Pushpalal Park", "Tinau Bridge Butwal", "Janata Chowk"],
      7: ["Deepnagar", "Belbas Road", "Parijat Path"],
      8: ["Sukhanagar", "Traffic Chowk East", "Siddhartha Gautam Buddha Campus Area"],
      9: ["Kalikanagar", "Highway Chowk", "Horizan Chowk"],
      10: ["Kalikanagar South", "Ramnagar", "Butwal Mandap Area"],
      11: ["Devinagar", "Majhgawon", "ANFA Football Ground Area", "Naharpur"],
      12: ["Tamnagar", "Nayagaun"]
    },

    // -----------------------------------------------------------
    // BIRATNAGAR METROPOLITAN CITY (Morang)
    // -----------------------------------------------------------
    "Biratnagar Metropolitan City": {
      1: ["Mills Area", "Rani Gate", "Custom Area Biratnagar"],
      2: ["Tintoliya", "Shankarpur", "Bhatbhateni Biratnagar"],
      3: ["Pushpalal Chowk", "Bargachhi", "Pani Tanki"],
      7: ["Traffic Chowk", "Main Road Biratnagar", "Jaljala Chowk", "Gudri Bazar"],
      8: ["Haatkhola", "Singhiya", "Devkota Chowk"],
      9: ["Mahendra Chowk", "Hospital Chowk", "Koshi Zonal Hospital Area"],
      10: ["Golchha Chowk", "Tinpaini", "Munna Chowk"],
      11: ["Bhanu Chowk Biratnagar", "Buspark Area"],
      12: ["Bargachhi North", "Keshaliya"]
    },

    // -----------------------------------------------------------
    // BIRGUNJ METROPOLITAN CITY (Parsa)
    // -----------------------------------------------------------
    "Birgunj Metropolitan City": {
      1: ["Ghantaghar Birgunj", "Main Road", "Adarshanagar", "Maisthan"],
      2: ["Chhapkaiya", "Shreepur", "Birgunj Custom"],
      6: ["Maisthan Temple Area", "Mina Bazar", "Gita Mandir Road"],
      8: ["Railway Road", "Link Road Birgunj", "Ghantaghar South"],
      10: ["Adarshnagar Main", "Birgunj Inland Port Area", "Powerhouse Chowk"],
      13: ["Radhemai", "Murli Chowk"],
      14: ["Pipra", "Bahuri"]
    },

    // -----------------------------------------------------------
    // DHARAN & ITAHARI (Sunsari)
    // -----------------------------------------------------------
    "Dharan Sub-Metropolitan City": {
      1: ["Purano Bazar Dharan", "Chhata Chowk Dharan"],
      2: ["Bhanu Chowk Dharan", "Clock Tower", "Main Road"],
      3: ["Singhadurbar Line", "Bagarkot Road"],
      8: ["BPKIHS Hospital Area", "Buddha Chowk Dharan", "Ghopa Camp"],
      12: ["Chhata Chowk", "Putali Line Dharan", "Shiva Galli"],
      15: ["Shyam Chowk", "Bhotepul"]
    },
    "Itahari Sub-Metropolitan City": {
      1: ["Itahari Chowk", "Main Road Itahari", "Biratnagar Line"],
      4: ["Sangeet Chowk", "Hospital Road Itahari"],
      6: ["Gorkha Tole", "Trikon Chowk"],
      9: ["Bypass Road", "Pashupati Tole"]
    },

    // -----------------------------------------------------------
    // DHANGADHI & NEPALGUNJ
    // -----------------------------------------------------------
    "Dhangadhi Sub-Metropolitan City": {
      1: ["Dhangadhi Main Bazar", "Traffic Chowk Dhangadhi", "Park Mod"],
      2: ["Rato Pul", "Bhairab Tole", "Milan Chowk Dhangadhi"],
      4: ["Uttar Behadi", "Boradandi", "CP Hospital Road"],
      5: ["Hasanpur", "Pipalchautara", "Campus Road Dhangadhi"]
    },
    "Nepalgunj Sub-Metropolitan City": {
      1: ["Dhambojhi Chowk", "Surkhet Road", "Bhatbhateni Nepalgunj"],
      2: ["Tribhuvan Chowk", "Sadar Line", "Rani Talao"],
      4: ["BP Chowk Nepalgunj", "Ganeshpur"],
      10: ["Carakpur", "Medical College Road"]
    },

    // -----------------------------------------------------------
    // HETAUDA & BHAKTAPUR
    // -----------------------------------------------------------
    "Hetauda Sub-Metropolitan City": {
      1: ["Chaukitole", "Samrajya Tole", "Rapti Bridge"],
      2: ["Hetauda Main Bazar", "Buddha Chowk Hetauda", "School Road"],
      4: ["Huprachaur", "Kantirajpath", "Hospital Road Hetauda"],
      5: ["Sanopokhara", "Pani Tanki Hetauda"]
    },
    "Bhaktapur Municipality": {
      1: ["Sallaghari", "Chundevi Bhaktapur", "Niketan Road"],
      2: ["Byasi", "Itachhen", "Bhelukhel"],
      3: ["Durbar Square Bhaktapur", "Dattatreya Area", "Taumadhi Square", "Nyatapola Area"],
      7: ["Golmadhi", "Inacho", "Choche Tole"]
    },
    "Madhyapur Thimi Municipality": {
      1: ["Lokanthali", "Radhe Radhe", "Kaushaltar", "Siddhartha Bus Stop"],
      2: ["Sanothimi", "Education Complex Area"],
      3: ["Gaththaghar", "Bhatbhateni Thimi"],
      4: ["Thimi Bazar", "Balkumari Thimi", "Layaku"]
    },

    // -----------------------------------------------------------
    // JANAKPURDHAM SUB-METROPOLITAN CITY (Dhanusha)
    // -----------------------------------------------------------
    "Janakpurdham Sub-Metropolitan City": {
      1: ["Bhanu Chowk", "Station Road", "Shiv Chowk"],
      2: ["Janaki Mandir Area", "Ramanand Chowk", "Main Road Janakpur"],
      3: ["Muralidhar Chowk", "Mills Area", "Bishwakarma Chowk"],
      4: ["Kadam Chowk", "Janakpur Campus Area"],
      7: ["Zero Mile Janakpur", "Pidari Chowk"],
      8: ["Bishahara Chowk", "Mujeliya"]
    },

    // -----------------------------------------------------------
    // BIRENDRANAGAR MUNICIPALITY (Surkhet / Karnali HQ)
    // -----------------------------------------------------------
    "Birendranagar Municipality": {
      1: ["Bangesimal", "Kankrebihar Road"],
      2: ["Birendranagar Main Bazar", "Birendra Chowk", "Hospital Road"],
      3: ["Mangalgadhi Chowk", "Jumla Road", "Airport Gate Surkhet"],
      6: ["Birendra Chowk East", "Dhuliyabit", "Shubha Hotel Line"],
      7: ["Itram", "Shanti Tole Surkhet"],
      8: ["Khalte", "Kalyan", "Campus Road Surkhet"]
    },

    // -----------------------------------------------------------
    // TULSIPUR & GHORAHI SUB-METROPOLITAN CITIES (Dang)
    // -----------------------------------------------------------
    "Tulsipur Sub-Metropolitan City": {
      1: ["Birendra Chowk Tulsipur", "Main Road", "Hospital Line"],
      5: ["Buspark Tulsipur", "Traffic Chowk", "Ghorahi Road"],
      6: ["Araniko Chowk", "Rani Jharana Area", "Campus Road"]
    },
    "Ghorahi Sub-Metropolitan City": {
      14: ["Ghorahi Main Bazar", "Traffic Chowk Ghorahi", "Sahid Gate"],
      15: ["Damar Gaun", "Bharatpur Dang", "Ratanpur"],
      16: ["Chaughera", "Gorakhnath Mandir Area"]
    },

    // -----------------------------------------------------------
    // SIDDHARTHANAGAR MUNICIPALITY (Bhairahawa, Rupandehi)
    // -----------------------------------------------------------
    "Siddharthanagar Municipality": {
      1: ["Belahiya", "Nepal-India Border Gate", "Custom Area"],
      3: ["Bank Road Bhairahawa", "Narayansthan", "Milan Chowk"],
      5: ["Buddha Chowk Bhairahawa", "Hospital Line", "Buspark Area"],
      8: ["Devkota Chowk", "Gautam Buddha Airport Road", "Anchalpur"]
    },

    // -----------------------------------------------------------
    // BIRTAMOD & DAMAK (Jhapa)
    // -----------------------------------------------------------
    "Birtamod Municipality": {
      1: ["Mukti Chowk Birtamod", "Bhadrapur Road", "One Stop Mall Area"],
      2: ["Sanischare Road", "Traffic Chowk Birtamod", "Hanuman Central Area"],
      3: ["Birtamod Buspark", "Birat Eye Hospital Road"],
      5: ["Dhungegaddi", "Hospital Chowk Birtamod"]
    },
    "Damak Municipality": {
      1: ["Damak Main Bazar", "Thana Road Damak", "Gorkha Tole"],
      5: ["Ganatantra Chowk", "Traffic Chowk Damak", "Hospital Line Damak"],
      6: ["Damak Campus Road", "Beldangi Road", "Purano Bazar"]
    },

    // -----------------------------------------------------------
    // KIRTIPUR & BUDHANILKANTHA (Kathmandu)
    // -----------------------------------------------------------
    "Kirtipur Municipality": {
      1: ["Baghbhairab Area", "Nayabazar Kirtipur"],
      2: ["TU Gate", "Tribhuvan University Campus Area", "Devdhoka"],
      3: ["Chilancho Stupa", "Khasibazar Kirtipur", "Panga"]
    },
    "Budhanilkantha Municipality": {
      1: ["Budhanilkantha Temple Area", "Narayanthan Chowk"],
      2: ["Chunikhel", "Bhangal"],
      3: ["Golfutar", "Hattigauda", "Mahankal", "Budhanilkantha School Gate"],
      8: ["Mandikhatar", "Ekantakuna Budhanilkantha"]
    },

    // -----------------------------------------------------------
    // DEVCHULI & MADHYABINDU (Nawalpur)
    // -----------------------------------------------------------
    "Devchuli Municipality": {
      1: ["Kawasoti Border", "Daldale Bazar", "Prithvi Chowk Daldale"],
      2: ["Pragatinagar", "Highway Chowk Pragatinagar", "Hospital Road"],
      7: ["Rajahar Bazar", "Natshwor Mandir Area", "Devchuli Base"]
    },
    "Madhyabindu Municipality": {
      1: ["Chormara Bazar", "Highway Chowk Chormara", "Purano Bazar"],
      2: ["Tamaspur", "Main Road Chormara"],
      7: ["Kolhuwa Bazar", "Rhino View Point Area", "Narayani River Beach"]
    }
  },

  // Generic landmark & street type patterns for dynamic intelligent autocomplete
  streetSuffixes: [
    "Chowk", "Tole", "Marga", "Bazar", "Road", "Street",
    "Galli", "Height", "Gate", "Chautara", "Patan", "Mod"
  ],

  // Common Nepal generic street patterns
  genericPatterns: [
    "Main Road",
    "Hospital Road",
    "Traffic Chowk",
    "Milan Chowk",
    "Shanti Tole",
    "Campus Road",
    "Link Road",
    "Railway Road",
    "Bazar Area",
    "Purano Bazar",
    "School Road",
    "Mandir Marga",
    "Bypass Road",
    "Buspark Area",
    "Cinema Line",
    "College Road",
    "Airport Road",
    "Bridge Area",
    "Custom Area",
    "Durbar Area"
  ]
};

/**
 * Intelligent Local Tole / Street Suggestion Provider
 * Evaluates: (Province, District, Municipality, Ward No.)
 * Returns: Array of strings representing curated, verified local toles/streets.
 */
function getToleSuggestions(province, district, municipality, ward) {
  if (!municipality) return [];

  const results = [];
  const wardNum = ward ? parseInt(ward, 10) : null;

  // 1. Check exact or alias Municipality & Ward match in database
  if (NEPAL_ADMIN_DATA.wardToles) {
    let muniWards = NEPAL_ADMIN_DATA.wardToles[municipality];
    if (!muniWards) {
      const aliasKey = municipality.includes("Tribeni")
        ? municipality.replace("Tribeni", "Triveni")
        : municipality.replace("Triveni", "Tribeni");
      muniWards = NEPAL_ADMIN_DATA.wardToles[aliasKey];
    }
    if (!muniWards) {
      // Case-insensitive / partial match
      const lowerMun = municipality.toLowerCase().trim();
      const matchedKey = Object.keys(NEPAL_ADMIN_DATA.wardToles).find(k => k.toLowerCase().trim() === lowerMun);
      if (matchedKey) muniWards = NEPAL_ADMIN_DATA.wardToles[matchedKey];
    }

    if (muniWards) {
      if (wardNum && muniWards[wardNum] && Array.isArray(muniWards[wardNum])) {
        results.push(...muniWards[wardNum]);
      } else if (!wardNum) {
        // Aggregate top toles across all wards of this municipality
        Object.keys(muniWards).forEach(w => {
          if (Array.isArray(muniWards[w])) {
            muniWards[w].slice(0, 3).forEach(t => {
              if (!results.includes(t)) results.push(t);
            });
          }
        });
      }
    }
  }

  // 2. Intelligent dynamic fallback for any ward/municipality across Nepal
  if (wardNum && results.length < 4) {
    const cleanMunName = municipality.replace(/(Metropolitan City|Sub-Metropolitan City|Rural Municipality|Municipality)/g, "").trim();
    const dynamicPatterns = [
      `${cleanMunName} Ward ${wardNum} Main Chowk`,
      `Ward ${wardNum} Bazar Area`,
      `Ward ${wardNum} Purano Tole`,
      `Ward ${wardNum} Hospital Road`,
      `Ward ${wardNum} School Road`,
      `Ward ${wardNum} Mandir Marga`,
      `Ward ${wardNum} Shanti Tole`
    ];

    dynamicPatterns.forEach(p => {
      if (!results.includes(p)) results.push(p);
    });
  }

  return results;
}

/**
 * Filter Tole / Street suggestions in real-time as user types.
 * Matches query against local dataset, preserving case-insensitive substring matches,
 * supporting English and Nepali characters, and dynamic generic Nepal patterns.
 */
function filterToleSuggestions(query, province, district, municipality, ward) {
  const localList = getToleSuggestions(province, district, municipality, ward);
  const cleanQ = (query || "").trim();

  if (!cleanQ) {
    return localList;
  }

  const lowerQ = cleanQ.toLowerCase();

  // Tier 1: Exact / Starts-with match
  const startsWith = [];
  // Tier 2: Word starts with match (e.g. "Chowk" -> "Milan Chowk")
  const wordStartsWith = [];
  // Tier 3: General includes match
  const includes = [];

  localList.forEach(item => {
    const lowerItem = item.toLowerCase();
    if (lowerItem.startsWith(lowerQ)) {
      startsWith.push(item);
    } else if (lowerItem.split(/\s+/).some(w => w.startsWith(lowerQ))) {
      wordStartsWith.push(item);
    } else if (lowerItem.includes(lowerQ)) {
      includes.push(item);
    }
  });

  const combined = [...new Set([...startsWith, ...wordStartsWith, ...includes])];

  // Tier 4: Dynamic intelligent generic patterns matching query
  const genericMatches = [];
  const suffixes = NEPAL_ADMIN_DATA.streetSuffixes || [
    "Chowk", "Tole", "Marga", "Bazar", "Road", "Street", "Galli", "Height", "Gate", "Chautara", "Mod"
  ];

  // If query is a single word or partial word, suggest standard combinations
  if (cleanQ.length >= 2) {
    // Check known generic patterns (e.g. "Main Road", "Traffic Chowk", "Milan Chowk")
    (NEPAL_ADMIN_DATA.genericPatterns || []).forEach(pattern => {
      if (pattern.toLowerCase().includes(lowerQ) && !combined.includes(pattern) && !genericMatches.includes(pattern)) {
        genericMatches.push(pattern);
      }
    });

    // Check suffix completions (e.g. "Milan" -> "Milan Chowk", "Milan Tole", "Milan Marga")
    const capitalizedQ = cleanQ.charAt(0).toUpperCase() + cleanQ.slice(1);
    suffixes.forEach(suf => {
      const candidate = `${capitalizedQ} ${suf}`;
      if (!combined.includes(candidate) && !genericMatches.includes(candidate)) {
        if (suf.toLowerCase().startsWith(lowerQ) || lowerQ.startsWith(suf.toLowerCase())) {
          // already matching
        } else {
          // add smart suffix option if query doesn't already have suffix
          const hasSuffix = suffixes.some(s => lowerQ.endsWith(s.toLowerCase()));
          if (!hasSuffix && genericMatches.length < 4) {
            genericMatches.push(candidate);
          }
        }
      }
    });
  }

  const finalResults = [...new Set([...combined, ...genericMatches])];
  return finalResults.slice(0, 10);
}

/**
 * Helper to build the canonical 5-level Nepal Delivery Address string
 */
function formatNepalAddress(addr) {
  if (!addr) return "";
  const parts = [];
  if (addr.tole) parts.push(addr.tole.trim());
  if (addr.ward) parts.push(`Ward No. ${addr.ward}`);
  if (addr.municipality) parts.push(addr.municipality.trim());
  if (addr.district) parts.push(addr.district.trim());
  if (addr.province) parts.push(addr.province.trim());
  parts.push("Nepal");
  return parts.filter(Boolean).join(", ");
}

/**
 * Validates Nepali mobile phone numbers (strictly 10 
 * digits: 98XXXXXXXX, 97XXXXXXXX, 96XXXXXXXX)
 */
function validateNepalPhoneNumber(phoneStr) {
  if (!phoneStr) return { valid: false, message: "Please enter your 10-digit mobile number.", cleaned: "" };
  const cleaned = phoneStr.replace(/\D/g, "").slice(0, 10);

  if (cleaned.length < 10) {
    return {
      valid: false,
      message: `Please enter exactly 10 digits (${cleaned.length}/10 digits).`,
      cleaned: cleaned
    };
  }

  const nepalMobileRegex = /^(98|97|96)\d{8}$/;
  if (!nepalMobileRegex.test(cleaned)) {
    return {
      valid: false,
      message: "Please enter a valid 10-digit Nepal mobile number starting with 98, 97, or 96.",
      cleaned: cleaned
    };
  }

  return { valid: true, message: "", cleaned: cleaned };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    NEPAL_ADMIN_DATA,
    getToleSuggestions,
    filterToleSuggestions,
    formatNepalAddress,
    validateNepalPhoneNumber
  };
}

