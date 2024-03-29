import Hero from "../Components/Hero"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { UserAuth } from '../Config/AuthContext';
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc, query, onSnapshot, where, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db } from "../Config/firebase-config";
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export default function Profile() {

  // Valstu saraksts
  const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    {
      code: 'AE',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    {
      code: 'AG',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
    { code: 'AO', label: 'Angola', phone: '244' },
    { code: 'AQ', label: 'Antarctica', phone: '672' },
    { code: 'AR', label: 'Argentina', phone: '54' },
    { code: 'AS', label: 'American Samoa', phone: '1-684' },
    { code: 'AT', label: 'Austria', phone: '43' },
    {
      code: 'AU',
      label: 'Australia',
      phone: '61',
      suggested: true,
    },
    { code: 'AW', label: 'Aruba', phone: '297' },
    { code: 'AX', label: 'Alland Islands', phone: '358' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994' },
    {
      code: 'BA',
      label: 'Bosnia and Herzegovina',
      phone: '387',
    },
    { code: 'BB', label: 'Barbados', phone: '1-246' },
    { code: 'BD', label: 'Bangladesh', phone: '880' },
    { code: 'BE', label: 'Belgium', phone: '32' },
    { code: 'BF', label: 'Burkina Faso', phone: '226' },
    { code: 'BG', label: 'Bulgaria', phone: '359' },
    { code: 'BH', label: 'Bahrain', phone: '973' },
    { code: 'BI', label: 'Burundi', phone: '257' },
    { code: 'BJ', label: 'Benin', phone: '229' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
    { code: 'BM', label: 'Bermuda', phone: '1-441' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
    { code: 'BO', label: 'Bolivia', phone: '591' },
    { code: 'BR', label: 'Brazil', phone: '55' },
    { code: 'BS', label: 'Bahamas', phone: '1-242' },
    { code: 'BT', label: 'Bhutan', phone: '975' },
    { code: 'BV', label: 'Bouvet Island', phone: '47' },
    { code: 'BW', label: 'Botswana', phone: '267' },
    { code: 'BY', label: 'Belarus', phone: '375' },
    { code: 'BZ', label: 'Belize', phone: '501' },
    {
      code: 'CA',
      label: 'Canada',
      phone: '1',
      suggested: true,
    },
    {
      code: 'CC',
      label: 'Cocos (Keeling) Islands',
      phone: '61',
    },
    {
      code: 'CD',
      label: 'Congo, Democratic Republic of the',
      phone: '243',
    },
    {
      code: 'CF',
      label: 'Central African Republic',
      phone: '236',
    },
    {
      code: 'CG',
      label: 'Congo, Republic of the',
      phone: '242',
    },
    { code: 'CH', label: 'Switzerland', phone: '41' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
    { code: 'CK', label: 'Cook Islands', phone: '682' },
    { code: 'CL', label: 'Chile', phone: '56' },
    { code: 'CM', label: 'Cameroon', phone: '237' },
    { code: 'CN', label: 'China', phone: '86' },
    { code: 'CO', label: 'Colombia', phone: '57' },
    { code: 'CR', label: 'Costa Rica', phone: '506' },
    { code: 'CU', label: 'Cuba', phone: '53' },
    { code: 'CV', label: 'Cape Verde', phone: '238' },
    { code: 'CW', label: 'Curacao', phone: '599' },
    { code: 'CX', label: 'Christmas Island', phone: '61' },
    { code: 'CY', label: 'Cyprus', phone: '357' },
    { code: 'CZ', label: 'Czech Republic', phone: '420' },
    {
      code: 'DE',
      label: 'Germany',
      phone: '49',
      suggested: true,
    },
    { code: 'DJ', label: 'Djibouti', phone: '253' },
    { code: 'DK', label: 'Denmark', phone: '45' },
    { code: 'DM', label: 'Dominica', phone: '1-767' },
    {
      code: 'DO',
      label: 'Dominican Republic',
      phone: '1-809',
    },
    { code: 'DZ', label: 'Algeria', phone: '213' },
    { code: 'EC', label: 'Ecuador', phone: '593' },
    { code: 'EE', label: 'Estonia', phone: '372' },
    { code: 'EG', label: 'Egypt', phone: '20' },
    { code: 'EH', label: 'Western Sahara', phone: '212' },
    { code: 'ER', label: 'Eritrea', phone: '291' },
    { code: 'ES', label: 'Spain', phone: '34' },
    { code: 'ET', label: 'Ethiopia', phone: '251' },
    { code: 'FI', label: 'Finland', phone: '358' },
    { code: 'FJ', label: 'Fiji', phone: '679' },
    {
      code: 'FK',
      label: 'Falkland Islands (Malvinas)',
      phone: '500',
    },
    {
      code: 'FM',
      label: 'Micronesia, Federated States of',
      phone: '691',
    },
    { code: 'FO', label: 'Faroe Islands', phone: '298' },
    {
      code: 'FR',
      label: 'France',
      phone: '33',
      suggested: true,
    },
    { code: 'GA', label: 'Gabon', phone: '241' },
    { code: 'GB', label: 'United Kingdom', phone: '44' },
    { code: 'GD', label: 'Grenada', phone: '1-473' },
    { code: 'GE', label: 'Georgia', phone: '995' },
    { code: 'GF', label: 'French Guiana', phone: '594' },
    { code: 'GG', label: 'Guernsey', phone: '44' },
    { code: 'GH', label: 'Ghana', phone: '233' },
    { code: 'GI', label: 'Gibraltar', phone: '350' },
    { code: 'GL', label: 'Greenland', phone: '299' },
    { code: 'GM', label: 'Gambia', phone: '220' },
    { code: 'GN', label: 'Guinea', phone: '224' },
    { code: 'GP', label: 'Guadeloupe', phone: '590' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
    { code: 'GR', label: 'Greece', phone: '30' },
    {
      code: 'GS',
      label: 'South Georgia and the South Sandwich Islands',
      phone: '500',
    },
    { code: 'GT', label: 'Guatemala', phone: '502' },
    { code: 'GU', label: 'Guam', phone: '1-671' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
    { code: 'GY', label: 'Guyana', phone: '592' },
    { code: 'HK', label: 'Hong Kong', phone: '852' },
    {
      code: 'HM',
      label: 'Heard Island and McDonald Islands',
      phone: '672',
    },
    { code: 'HN', label: 'Honduras', phone: '504' },
    { code: 'HR', label: 'Croatia', phone: '385' },
    { code: 'HT', label: 'Haiti', phone: '509' },
    { code: 'HU', label: 'Hungary', phone: '36' },
    { code: 'ID', label: 'Indonesia', phone: '62' },
    { code: 'IE', label: 'Ireland', phone: '353' },
    { code: 'IL', label: 'Israel', phone: '972' },
    { code: 'IM', label: 'Isle of Man', phone: '44' },
    { code: 'IN', label: 'India', phone: '91' },
    {
      code: 'IO',
      label: 'British Indian Ocean Territory',
      phone: '246',
    },
    { code: 'IQ', label: 'Iraq', phone: '964' },
    {
      code: 'IR',
      label: 'Iran, Islamic Republic of',
      phone: '98',
    },
    { code: 'IS', label: 'Iceland', phone: '354' },
    { code: 'IT', label: 'Italy', phone: '39' },
    { code: 'JE', label: 'Jersey', phone: '44' },
    { code: 'JM', label: 'Jamaica', phone: '1-876' },
    { code: 'JO', label: 'Jordan', phone: '962' },
    {
      code: 'JP',
      label: 'Japan',
      phone: '81',
      suggested: true,
    },
    { code: 'KE', label: 'Kenya', phone: '254' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
    { code: 'KH', label: 'Cambodia', phone: '855' },
    { code: 'KI', label: 'Kiribati', phone: '686' },
    { code: 'KM', label: 'Comoros', phone: '269' },
    {
      code: 'KN',
      label: 'Saint Kitts and Nevis',
      phone: '1-869',
    },
    {
      code: 'KP',
      label: "Korea, Democratic People's Republic of",
      phone: '850',
    },
    { code: 'KR', label: 'Korea, Republic of', phone: '82' },
    { code: 'KW', label: 'Kuwait', phone: '965' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7' },
    {
      code: 'LA',
      label: "Lao People's Democratic Republic",
      phone: '856',
    },
    { code: 'LB', label: 'Lebanon', phone: '961' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
    { code: 'LI', label: 'Liechtenstein', phone: '423' },
    { code: 'LK', label: 'Sri Lanka', phone: '94' },
    { code: 'LR', label: 'Liberia', phone: '231' },
    { code: 'LS', label: 'Lesotho', phone: '266' },
    { code: 'LT', label: 'Lithuania', phone: '370' },
    { code: 'LU', label: 'Luxembourg', phone: '352' },
    { code: 'LV', label: 'Latvia', phone: '371' },
    { code: 'LY', label: 'Libya', phone: '218' },
    { code: 'MA', label: 'Morocco', phone: '212' },
    { code: 'MC', label: 'Monaco', phone: '377' },
    {
      code: 'MD',
      label: 'Moldova, Republic of',
      phone: '373',
    },
    { code: 'ME', label: 'Montenegro', phone: '382' },
    {
      code: 'MF',
      label: 'Saint Martin (French part)',
      phone: '590',
    },
    { code: 'MG', label: 'Madagascar', phone: '261' },
    { code: 'MH', label: 'Marshall Islands', phone: '692' },
    {
      code: 'MK',
      label: 'Macedonia, the Former Yugoslav Republic of',
      phone: '389',
    },
    { code: 'ML', label: 'Mali', phone: '223' },
    { code: 'MM', label: 'Myanmar', phone: '95' },
    { code: 'MN', label: 'Mongolia', phone: '976' },
    { code: 'MO', label: 'Macao', phone: '853' },
    {
      code: 'MP',
      label: 'Northern Mariana Islands',
      phone: '1-670',
    },
    { code: 'MQ', label: 'Martinique', phone: '596' },
    { code: 'MR', label: 'Mauritania', phone: '222' },
    { code: 'MS', label: 'Montserrat', phone: '1-664' },
    { code: 'MT', label: 'Malta', phone: '356' },
    { code: 'MU', label: 'Mauritius', phone: '230' },
    { code: 'MV', label: 'Maldives', phone: '960' },
    { code: 'MW', label: 'Malawi', phone: '265' },
    { code: 'MX', label: 'Mexico', phone: '52' },
    { code: 'MY', label: 'Malaysia', phone: '60' },
    { code: 'MZ', label: 'Mozambique', phone: '258' },
    { code: 'NA', label: 'Namibia', phone: '264' },
    { code: 'NC', label: 'New Caledonia', phone: '687' },
    { code: 'NE', label: 'Niger', phone: '227' },
    { code: 'NF', label: 'Norfolk Island', phone: '672' },
    { code: 'NG', label: 'Nigeria', phone: '234' },
    { code: 'NI', label: 'Nicaragua', phone: '505' },
    { code: 'NL', label: 'Netherlands', phone: '31' },
    { code: 'NO', label: 'Norway', phone: '47' },
    { code: 'NP', label: 'Nepal', phone: '977' },
    { code: 'NR', label: 'Nauru', phone: '674' },
    { code: 'NU', label: 'Niue', phone: '683' },
    { code: 'NZ', label: 'New Zealand', phone: '64' },
    { code: 'OM', label: 'Oman', phone: '968' },
    { code: 'PA', label: 'Panama', phone: '507' },
    { code: 'PE', label: 'Peru', phone: '51' },
    { code: 'PF', label: 'French Polynesia', phone: '689' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675' },
    { code: 'PH', label: 'Philippines', phone: '63' },
    { code: 'PK', label: 'Pakistan', phone: '92' },
    { code: 'PL', label: 'Poland', phone: '48' },
    {
      code: 'PM',
      label: 'Saint Pierre and Miquelon',
      phone: '508',
    },
    { code: 'PN', label: 'Pitcairn', phone: '870' },
    { code: 'PR', label: 'Puerto Rico', phone: '1' },
    {
      code: 'PS',
      label: 'Palestine, State of',
      phone: '970',
    },
    { code: 'PT', label: 'Portugal', phone: '351' },
    { code: 'PW', label: 'Palau', phone: '680' },
    { code: 'PY', label: 'Paraguay', phone: '595' },
    { code: 'QA', label: 'Qatar', phone: '974' },
    { code: 'RE', label: 'Reunion', phone: '262' },
    { code: 'RO', label: 'Romania', phone: '40' },
    { code: 'RS', label: 'Serbia', phone: '381' },
    { code: 'RU', label: 'Russian Federation', phone: '7' },
    { code: 'RW', label: 'Rwanda', phone: '250' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966' },
    { code: 'SB', label: 'Solomon Islands', phone: '677' },
    { code: 'SC', label: 'Seychelles', phone: '248' },
    { code: 'SD', label: 'Sudan', phone: '249' },
    { code: 'SE', label: 'Sweden', phone: '46' },
    { code: 'SG', label: 'Singapore', phone: '65' },
    { code: 'SH', label: 'Saint Helena', phone: '290' },
    { code: 'SI', label: 'Slovenia', phone: '386' },
    {
      code: 'SJ',
      label: 'Svalbard and Jan Mayen',
      phone: '47',
    },
    { code: 'SK', label: 'Slovakia', phone: '421' },
    { code: 'SL', label: 'Sierra Leone', phone: '232' },
    { code: 'SM', label: 'San Marino', phone: '378' },
    { code: 'SN', label: 'Senegal', phone: '221' },
    { code: 'SO', label: 'Somalia', phone: '252' },
    { code: 'SR', label: 'Suriname', phone: '597' },
    { code: 'SS', label: 'South Sudan', phone: '211' },
    {
      code: 'ST',
      label: 'Sao Tome and Principe',
      phone: '239',
    },
    { code: 'SV', label: 'El Salvador', phone: '503' },
    {
      code: 'SX',
      label: 'Sint Maarten (Dutch part)',
      phone: '1-721',
    },
    {
      code: 'SY',
      label: 'Syrian Arab Republic',
      phone: '963',
    },
    { code: 'SZ', label: 'Swaziland', phone: '268' },
    {
      code: 'TC',
      label: 'Turks and Caicos Islands',
      phone: '1-649',
    },
    { code: 'TD', label: 'Chad', phone: '235' },
    {
      code: 'TF',
      label: 'French Southern Territories',
      phone: '262',
    },
    { code: 'TG', label: 'Togo', phone: '228' },
    { code: 'TH', label: 'Thailand', phone: '66' },
    { code: 'TJ', label: 'Tajikistan', phone: '992' },
    { code: 'TK', label: 'Tokelau', phone: '690' },
    { code: 'TL', label: 'Timor-Leste', phone: '670' },
    { code: 'TM', label: 'Turkmenistan', phone: '993' },
    { code: 'TN', label: 'Tunisia', phone: '216' },
    { code: 'TO', label: 'Tonga', phone: '676' },
    { code: 'TR', label: 'Turkey', phone: '90' },
    {
      code: 'TT',
      label: 'Trinidad and Tobago',
      phone: '1-868',
    },
    { code: 'TV', label: 'Tuvalu', phone: '688' },
    {
      code: 'TW',
      label: 'Taiwan, Province of China',
      phone: '886',
    },
    {
      code: 'TZ',
      label: 'United Republic of Tanzania',
      phone: '255',
    },
    { code: 'UA', label: 'Ukraine', phone: '380' },
    { code: 'UG', label: 'Uganda', phone: '256' },
    {
      code: 'US',
      label: 'United States',
      phone: '1',
      suggested: true,
    },
    { code: 'UY', label: 'Uruguay', phone: '598' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998' },
    {
      code: 'VA',
      label: 'Holy See (Vatican City State)',
      phone: '379',
    },
    {
      code: 'VC',
      label: 'Saint Vincent and the Grenadines',
      phone: '1-784',
    },
    { code: 'VE', label: 'Venezuela', phone: '58' },
    {
      code: 'VG',
      label: 'British Virgin Islands',
      phone: '1-284',
    },
    {
      code: 'VI',
      label: 'US Virgin Islands',
      phone: '1-340',
    },
    { code: 'VN', label: 'Vietnam', phone: '84' },
    { code: 'VU', label: 'Vanuatu', phone: '678' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
    { code: 'WS', label: 'Samoa', phone: '685' },
    { code: 'XK', label: 'Kosovo', phone: '383' },
    { code: 'YE', label: 'Yemen', phone: '967' },
    { code: 'YT', label: 'Mayotte', phone: '262' },
    { code: 'ZA', label: 'South Africa', phone: '27' },
    { code: 'ZM', label: 'Zambia', phone: '260' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263' },
  ];

  const map1 = new Map(
    countries.map(object => {
      return [object.label, object.label];
    }),
  );

  const [userProfile, setUserProfile] = useState([null]);
  const { user, updateProfile } = UserAuth();
  const userProfileRef = doc(db, "users", user.uid);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Editable variables:
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [birthDate, setBirthDate] = useState();
  const [groupLists, setGroupList] = useState([]);

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [selectedFile, setSelectedFile] = useState('');
  const storage = getStorage();
  const imagesRef = ref(storage, `profileImages/${user.uid}/${selectedFile.name}`);

  // Iegūt visas lietotāja izviedotās grupas:
  const getGroups = async () => {
    const q = query(collection(db, "groups"), where("group_admin", '==', user.uid));
    const data = onSnapshot(q, (querySnapshot) => {
      setGroupList(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }

  // Checklistam (nav funkcija)
  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  // Checklistam (intersection funkcija)
  function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }

  // Tiek ieķeksēts sludinājums:
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Sludinājums tiek padarīts pārdots/dzēsts:
  const handleCheckedRight = async () => {
    leftChecked.forEach(item => {
      const itemRef = doc(db, "shopping", item.id);
      updateDoc(itemRef, {
        sold: true
      })
    })
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  // Sludinājums tiek padarīts pieejams:
  const handleCheckedLeft = async () => {
    rightChecked.forEach(item => {
      const itemRef = doc(db, "shopping", item.id);
      updateDoc(itemRef, {
        sold: false
      })
    })
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  // Iegūt visus sludinājumus:
  const getSearchData = async () => {
    setLoading(true);
    const q1 = query(collection(db, "shopping"), where("user_id", '==', user.uid), where("sold", '==', false));
    const data1 = onSnapshot(q1, (querySnapshot) => {
      setLeft(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    const q2 = query(collection(db, "shopping"), where("user_id", '==', user.uid), where("sold", '==', true));
    const data2 = onSnapshot(q2, (querySnapshot) => {
      setRight(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    setLoading(false);

  };

  // Saraksts ar lietotāja izveidotajiem sludinājumiem:
  const customList = (shoppingList) => (
    <Paper sx={{ width: "550px", height: "auto", maxHeight: "800px", overflow: 'auto', border: 0, boxShadow: "none" }}>
      <List dense component="div" role="list">
        {shoppingList.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <img width="200px" height="120px" style={{ objectFit: "cover", borderRadius: "12px" }} src={value.image}></img>
              <Box sx={{ padding: 2 }}>
                <h3 id={labelId}>{value.title}</h3>
                {
                  value.sold
                    ? <Chip sx={{ margin: "3px" }} icon={<CancelIcon />} label="Sold" color="warning" />
                    : <Chip sx={{ margin: "3px" }} icon={<CheckCircleIcon />} label="Open" color="success" />

                }
                <Chip sx={{ margin: "3px" }} icon={<MonetizationOnIcon />} label={value.price} color="primary" />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  // Iegūt datus par profila info:
  const getData = async (e) => {

    const userProfileRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userProfileRef);

    if (docSnap.exists()) {
      setUserProfile(docSnap.data())
      console.log(userProfile.firstName)
      setLoadingProfile(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
    setGender(userProfile.gender)

  }

  // Saglabāt profila datus:
  const handleSave = async (e) => {

    // Neļauj restartēt lapu:
    e.preventDefault();
    // Sākumā kļūdas nav:
    setError('')

    try {
      // Aktivizē lādēšanās skatu:
      setLoading(true);
      // Atjauno lietotāja dokumentu users kolekcijā:
      await updateDoc(userProfileRef, {
        firstName: firstName === "" ? null : (!firstName ? userProfile.firstName : firstName),
        lastName: lastName === "" ? null : (!lastName ? userProfile.lastName : lastName),
        gender: gender ? gender : userProfile.gender,
        phoneNumber: phoneNumber === "" ? null : (!phoneNumber ? userProfile.phoneNumber : phoneNumber),
        country: country ? country : userProfile.country,
        city: city ? city : userProfile.city,
        birthDate: birthDate ? birthDate : userProfile.birthDate,
      });

      // Ja ir izvēlēts fails, to augšupielādē Firebase Storage un atjauno saiti users kolekcijā:
      if (selectedFile) {
        const uploadTask = await uploadBytesResumable(imagesRef, selectedFile);
        const url = await getDownloadURL(uploadTask.ref)

        updateProfile(user, { photoURL: url });
        await updateDoc(userProfileRef, {
          photoURL: url,
        });
      }

      // Atgriež jaunos datus:
      await getData();
      // Deaktivizē lādēšanās skatu:
      setLoading(false);
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  };

  // Dzēst lietotāja izviedotās grupas:
  const deleteGroup = async (e, groupID) => {

    // Neļauj restartēt lapu:
    e.preventDefault();
    // Sākumā kļūdas nav:
    setError('')

    // Aktivizē lādēšanās skatu:
    setLoading(true);
    // Atjauno lietotāja dokumentu users kolekcijā:
    await deleteDoc(doc(db, 'groups', groupID));

    // Atgriež jaunos datus:
    await getData();
    // Deaktivizē lādēšanās skatu:
    setLoading(false);
  };

  // UseEffect klausīšanās funkcija:
  useEffect(() => {
    getData();
    getSearchData();
    getGroups();
  }, [])

  return (
    <Box>
      <Hero title="Profile" desc={'E-mail: ' + user.email + ', Username: ' + user.displayName}  ></Hero>

      <Box component="form" noValidate onSubmit={handleSave} sx={{ bgcolor: "white", borderRadius: "16px", padding: "20px" }}>



        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Avatar
                alt="Remy Sharp"
                src={userProfile.photoURL} //{user.photoURL ? user.photoURL : null}
                sx={{ width: 100, height: 100 }}
              />
            </label>
          </Grid>
        </Grid>


        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <TextField
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  id="outlined-required"
                  label="First Name"
                  defaultValue={userProfile.firstName}
                />
              }
            </Box>
          </Grid>
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <TextField
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  id="outlined-required"
                  label="Last Name"
                  defaultValue={userProfile.lastName}
                />
              }
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <TextField
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  type="tel"
                  id="outlined-required"
                  label="Phone Number"
                  placeholder="123-45-678"
                  defaultValue={userProfile.phoneNumber}
                />
              }
            </Box>
          </Grid>
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <FormControl>
                  <InputLabel id="demo-simple-select-disabled-label">Gender</InputLabel>
                  <Select
                    onChange={(e) => setGender(e.target.value)}
                    defaultValue={userProfile.gender}
                    placeholder="Gender"
                    label="Gender"
                    sx={{ width: "227px" }}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Unknown"}><em>Unknown</em></MenuItem>
                  </Select>
                </FormControl>

              }
            </Box>
          </Grid>
        </Grid>


        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <FormControl>
                  <InputLabel id="demo-simple-select-disabled-label">Country</InputLabel>

                  <Select
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 40 * 9 + 0,
                        },
                      },
                    }}
                    onChange={(e) => setCountry(e.target.value)}
                    defaultValue={userProfile.country}
                    placeholder="Country"
                    label="Country"
                    sx={{ width: "227px" }}
                  >
                    {
                      countries.map(object => {
                        return <MenuItem key={object.code} value={object.label}>
                          <Container style={{ paddingLeft: "0px" }}>
                            <img
                              style={{ paddingRight: "10px" }}
                              loading="lazy"
                              src={`https://flagcdn.com/w20/${object.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${object.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {object.label}
                          </Container>


                        </MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              }
            </Box>
          </Grid>
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <TextField
                  onChange={(e) => setCity(e.target.value)}
                  required
                  id="outlined-required"
                  label="City"
                  defaultValue={userProfile.city}
                />
              }
            </Box>
          </Grid>
        </Grid>

        <Grid container sx={{ width: "90%", justifyContent: "center", margin: "auto" }} rowSpacing={2} columnSpacing={{ xs: 0, sm: 2, md: 2 }} >
          <Grid item>
            <Box className="text-field-skeleton" sx={{ textAlign: 'start', bgcolor: '', width: 227 }}>
              {loadingProfile ? <Skeleton variant="rounded" width={227} height={56} /> :
                <FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Birth Date"
                      //defaultValue={userProfile.birthDate}
                      value={birthDate ? birthDate : (userProfile.birthDate ? userProfile.birthDate.toDate() : null)}
                      onChange={(newValue) => {
                        setBirthDate(newValue.$d);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              }
            </Box>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Save
        </Button>

      </Box>


      <Box component="form" noValidate onSubmit={handleSave} sx={{ bgcolor: "white", borderRadius: "16px", padding: "20px", marginTop: "20px" }}>
        <h1>My Items:</h1>
        <Grid container spacing={2} marginTop="10px" justifyContent="center" alignItems="center">
          <Grid item >{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">

              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                Sold &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt; Open
              </Button>

            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>


      </Box>

      <Box component="form" noValidate onSubmit={handleSave} sx={{ justifyContent: "middle", bgcolor: "white", borderRadius: "16px", padding: "20px", marginTop: "20px" }}>
        <h1>My Groups:</h1>
        <Box sx={{ width: "auto", maxWidth: "400px", margin: "auto", marginTop: "10px" }}>
          <List dense={true}>

            {groupLists
              .map((listItem) => {
                return (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={(e) => deleteGroup(e, listItem.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={listItem.group_admin_photoUrl}>
                        {listItem.group_admin_photoUrl}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={listItem.group_name}
                      secondary={listItem.group_category}
                    />
                  </ListItem>

                );
              })}


          </List>
        </Box>
      </Box>



    </Box>

  )
}

