const sellingData = [
    {
        id: 'fs1',
        Amount: 50,
        PricePerKg: 25,
        Status: 'Sold Out',
        Interested: 17,
        CollectionDate: '12/11/2023'
    },
    {
        id: 'fs2',
        Amount: 40,
        PricePerKg: 27,
        Status: 'Sold Out',
        Interested: 12,
        CollectionDate: '25/11/2023'
    },
    {
        id: 'fs3',
        Amount: 70,
        PricePerKg: 30,
        Status: 'Pending',
        Interested: 22,
        CollectionDate: '05/12/2023'
    },

]





const expenseData = [
    {
        id: 1,
        ExpenseSector: 'Seed',
        MeasurementUnit: 45,
        Cost: 45000,
    },
    {
        id: 2,
        ExpenseSector: 'Labor',
        MeasurementUnit: 2,
        Cost: 5000,
    },
    {
        id: 3,
        ExpenseSector: 'Fertilizer',
        MeasurementUnit: 7,
        Cost: 7000,
    },
    {
        id: 4,
        ExpenseSector: 'Accessories',
        MeasurementUnit: 10,
        Cost: 1200,
    },
]




const transactionData = [
    {
        'Transacton ID': '438S24SA31T',
        'Trader Name': 'Abdul Karim',
        'Product Type': 'Tometo',
        'Date': '25 Sep, 2023',
        'Quantity': '180',
        'Price (Per KG)': '30',
        'Amount': '25000',
    },
    {
        'Transacton ID': '437S24SA21T',
        'Trader Name': 'Kibria Hasan',
        'Product Type': 'Egg Plant',
        'Date': '25 Sep, 2023',
        'Quantity': '180',
        'Price (Per KG)': '330',
        'Amount': '50000',
    },
    {
        'Transacton ID': '567G44AA131T',
        'Trader Name': 'Nayem Kader',
        'Product Type': 'Egg Plant',
        'Date': '18 sep, 2023',
        'Quantity': '200',
        'Price (Per KG)': '40',
        'Amount': '33000',
    },
    {
        'Transacton ID': '658T33SA41T',
        'Trader Name': 'Kudus Karim',
        'Product Type': 'Pumpkins',
        'Date': '29 Sep, 2023',
        'Quantity': '100',
        'Price (Per KG)': '130',
        'Amount': '10000',
    },
    {
        'Transacton ID': '125S15SA21T',
        'Trader Name': 'Faruk Hasan',
        'Product Type': 'Tometo',
        'Date': '11 Sep, 2023',
        'Quantity': '400',
        'Price (Per KG)': '300',
        'Amount': '30000',
    },
    {
        'Transacton ID': '537S34SA21T',
        'Trader Name': 'Abdul Karim',
        'Product Type': 'Tometo',
        'Date': '25 Sep, 2023',
        'Quantity': '180',
        'Price (Per KG)': '30',
        'Amount': '25000',
    },
    {
        'Transacton ID': '438S24SA31T',
        'Trader Name': 'Abdul Karim',
        'Product Type': 'Tometo',
        'Date': '25 Sep, 2023',
        'Quantity': '180',
        'Price (Per KG)': '30',
        'Amount': '25000',
    },
    {
        'Transacton ID': '427S25SA35T',
        'Trader Name': 'Zahidul Alam',
        'Product Type': 'Egg Plant',
        'Date': '12 Sep, 2023',
        'Quantity': '300',
        'Price (Per KG)': '130',
        'Amount': '22000',
    },
    {
        'Transacton ID': '338S26SA31T',
        'Trader Name': 'Pritom Sultan',
        'Product Type': 'Egg Plant',
        'Date': '13 Aug, 2023',
        'Quantity': '200',
        'Price (Per KG)': '33',
        'Amount': '45000',
    },
    {
        'Transacton ID': '122S22SA31T',
        'Trader Name': 'Apu Haider',
        'Product Type': 'Tometo',
        'Date': '24 Sep, 2023',
        'Quantity': '170',
        'Price (Per KG)': '68',
        'Amount': '65000',
    },
    {
        'Transacton ID': '844S42SA31T',
        'Trader Name': 'Jabir Abzar',
        'Product Type': 'Egg Plant',
        'Date': '26 Aug, 2023',
        'Quantity': '180',
        'Price (Per KG)': '67',
        'Amount': '72000',
    },
    {
        'Transacton ID': '333S23SA31T',
        'Trader Name': 'Sifatul Sultan',
        'Product Type': 'Cuccumber',
        'Date': '24 Sep, 2023',
        'Quantity': '170',
        'Price (Per KG)': '100',
        'Amount': '100000',
    },
    {
        'Transacton ID': '142S72SA31T',
        'Trader Name': 'Sowad Feruk',
        'Product Type': 'Tometo',
        'Date': '15 Oct, 2023',
        'Quantity': '200',
        'Price (Per KG)': '33',
        'Amount': '47000',
    },
    {
        'Transacton ID': '552S22SA31T',
        'Trader Name': 'Apu Haider',
        'Product Type': 'Cuccumber',
        'Date': '24 Oct, 2023',
        'Quantity': '200',
        'Price (Per KG)': '101',
        'Amount': '202000',
    },
    {
        'Transacton ID': '626S62SA31T',
        'Trader Name': 'Joshim Islam',
        'Product Type': 'TomeEgg Plant',
        'Date': '24 Sep, 2023',
        'Quantity': '200',
        'Price (Per KG)': '120',
        'Amount': '80000',
    },
    {
        'Transacton ID': '323S28SA31T',
        'Trader Name': 'Noor Ahmed',
        'Product Type': 'Cuccumber',
        'Date': '24 Sep, 2023',
        'Quantity': '105',
        'Price (Per KG)': '90',
        'Amount': '107000',
    },
    {
        'Transacton ID': '626S21SA34T',
        'Trader Name': 'Wasi Haider',
        'Product Type': 'Tometo',
        'Date': '18 Sep, 2023',
        'Quantity': '170',
        'Price (Per KG)': '68',
        'Amount': '65000',
    },
    {
        'Transacton ID': '456S23SA32T',
        'Trader Name': 'Nahid Babu',
        'Product Type': 'Tometo',
        'Date': '13 Sep, 2023',
        'Quantity': '160',
        'Price (Per KG)': '68',
        'Amount': '66000',
    },
    {
        'Transacton ID': '112S22SA11T',
        'Trader Name': 'Bishal Das',
        'Product Type': 'Egg Plant',
        'Date': '24 Sep, 2023',
        'Quantity': '120',
        'Price (Per KG)': '67',
        'Amount': '78000',
    },
    {
        'Transacton ID': '824S22SA39T',
        'Trader Name': 'Mahidi Hossan',
        'Product Type': 'Cuccumber',
        'Date': '15 Oct, 2023',
        'Quantity': '170',
        'Price (Per KG)': '109',
        'Amount': '600000',
    },

]



const traderSearch = [
    {
        'Trader Name': 'Sanju Shourov',
        'Trader ID': 'T7099195023',
        'Location': 'Begumgonj, Noakhali',
        'Started': '25 Jan, 2000',
        'Goods': ['Tometo', 'Cabbage', 'Onion'],
        'Successful Transaction': '70',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Agailjhara, Barisal',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '12',
    },
    {
        'Trader Name': 'Didarul Didar',
        'Trader ID': 'T8091322023',
        'Location': 'Gournadi, Barisal',
        'Started': '25 Jun, 2007',
        'Goods': ['Potato', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '40',
    },
    {
        'Trader Name': 'Bijoy Sharkar',
        'Trader ID': 'T9090392023',
        'Location': 'Bakergonj, Barisal',
        'Started': '25 Sep, 2017',
        'Goods': ['Tometo', 'Cuccumber'],
        'Successful Transaction': '5',
    },
    {
        'Trader Name': 'Tanzim Karim',
        'Trader ID': 'T5091392023',
        'Location': 'Banaripara, Barisal',
        'Started': '25 Sep, 2004',
        'Goods': ['Cuccumber'],
        'Successful Transaction': '26',
    },
    {
        'Trader Name': 'Ali Ashraf',
        'Trader ID': 'T3391692023',
        'Location': 'Sadar, Barisal',
        'Started': '26 Mar, 2002',
        'Goods': ['Tometo', 'Egg Plant'],
        'Successful Transaction': '33',
    },
    {
        'Trader Name': 'Nafis Choudury',
        'Trader ID': 'T7091392023',
        'Location': 'Mehendigonj, Barisal',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Muladi, Barisal',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Hridoy Kamal',
        'Trader ID': 'T2061322023',
        'Location': 'Wazirpur, Barisal',
        'Started': '26 Sep, 2001',
        'Goods': ['Egg Plant'],
        'Successful Transaction': '24',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Location': 'Hizla, Barisal',
        'Trader ID': 'T4491392023',
        'Started': '04 Feb, 2003',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '22',
    },
    {
        'Trader Name': 'Amit Hasan',
        'Trader ID': 'T5051352023',
        'Location': 'Hizla, Noakhali',
        'Started': '05 Aug, 2005',
        'Goods': ['Cuccumber', 'Onion'],
        'Successful Transaction': '34',
    },
    {
        'Trader Name': 'Faysal Abdulla',
        'Trader ID': 'T7781792023',
        'Location': 'Companyganj, Noakhali',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Chatkhil, Noakhali',
        'Started': '25 Apr, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '28',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Begumganj, Noakhali',
        'Started': '25 Sep, 2002',
        'Goods': ['Potato', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Shakil Samsu',
        'Trader ID': 'T2992322023',
        'Location': 'Senbag, Noakhali',
        'Started': '09 Dec, 2012',
        'Goods': ['Tometo', 'Egg Plant'],
        'Successful Transaction': '17',
    },
    {
        'Trader Name': 'Rippon Abdullah',
        'Trader ID': 'T1191492023',
        'Location': 'Shudharam, Noakhali',
        'Started': '12 Mar, 2012',
        'Goods': ['Potato', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Sadman Sakib',
        'Trader ID': 'T5092592023',
        'Location': 'Kabirhut, Noakhali',
        'Started': '25 Sep, 2021',
        'Goods': ['Potato'],
        'Successful Transaction': '2',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Charjabbar, Noakhali',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Syed Yousuf Ali',
        'Trader ID': 'T6091692023',
        'Location': 'Nijhum, Noakhali',
        'Started': '25 Jul, 1998',
        'Goods': ['Tometo', 'Egg Plant'],
        'Successful Transaction': '48',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Mainimati, Noakhali',
        'Started': '25 Sep, 2002',
        'Goods': ['Tometo', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '23',
    },
    {
        'Trader Name': 'Atik Arnob',
        'Trader ID': 'T7792292023',
        'Location': 'Pilak, Noakhali',
        'Started': '11 Nov, 2014',
        'Goods': ['Tometo', 'Cuccumber', 'Potato'],
        'Successful Transaction': '20',
    },
    {
        'Trader Name': 'Fahad Islam',
        'Trader ID': 'T7881392023',
        'Location': 'Hatia, Noakhali',
        'Started': '28 Oct, 2003',
        'Goods': ['Potato', 'Cuccumber', 'Egg Plant'],
        'Successful Transaction': '18',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T3031392023',
        'Location': 'Musapur, Noakhali',
        'Started': '20 Jul, 2006',
        'Goods': ['Egg Plant'],
        'Successful Transaction': '28',
    },


]








const projectPriceOfferData = [
    {
        'Trader Name': 'Sanju Shourov',
        'Trader ID': 'T7099195023',
        'Location': 'Begumgonj, Noakhali',
        'Quantity': '70',
        'Price (Per KG)': '24',

    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Agailjhara, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '30',
    },
    {
        'Trader Name': 'Didarul Didar',
        'Trader ID': 'T8091322023',
        'Location': 'Gournadi, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '55',
    },
    {
        'Trader Name': 'Bijoy Sharkar',
        'Trader ID': 'T9090392023',
        'Location': 'Bakergonj, Barisal',
        'Quantity': '80',
        'Price (Per KG)': '34',
    },
    {
        'Trader Name': 'Tanzim Karim',
        'Trader ID': 'T5091392023',
        'Location': 'Banaripara, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '33',
    },
    {
        'Trader Name': 'Ali Ashraf',
        'Trader ID': 'T3391692023',
        'Location': 'Sadar, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '29',
    },
    {
        'Trader Name': 'Nafis Choudury',
        'Trader ID': 'T7091392023',
        'Location': 'Mehendigonj, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '25',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Muladi, Barisal',
        'Quantity': '170',
        'Price (Per KG)': '20',
    },
    {
        'Trader Name': 'Hridoy Kamal',
        'Trader ID': 'T2061322023',
        'Location': 'Wazirpur, Barisal',
        'Quantity': '50',
        'Price (Per KG)': '44',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Location': 'Hizla, Barisal',
        'Trader ID': 'T4491392023',
        'Quantity': '40',
        'Price (Per KG)': '21',
    },
    {
        'Trader Name': 'Amit Hasan',
        'Trader ID': 'T5051352023',
        'Location': 'Hizla, Noakhali',
        'Quantity': '30',
        'Price (Per KG)': '19',
    },
    {
        'Trader Name': 'Faysal Abdulla',
        'Trader ID': 'T7781792023',
        'Location': 'Companyganj, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '18',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Chatkhil, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '23',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Begumganj, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '33',
    },
    {
        'Trader Name': 'Shakil Samsu',
        'Trader ID': 'T2992322023',
        'Location': 'Senbag, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '23',
    },
    {
        'Trader Name': 'Rippon Abdullah',
        'Trader ID': 'T1191492023',
        'Location': 'Shudharam, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '21',
    },
    {
        'Trader Name': 'Sadman Sakib',
        'Trader ID': 'T5092592023',
        'Location': 'Kabirhut, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '55',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Charjabbar, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '34',
    },
    {
        'Trader Name': 'Syed Yousuf Ali',
        'Trader ID': 'T6091692023',
        'Location': 'Nijhum, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '23',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T7091392023',
        'Location': 'Mainimati, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '23',
    },
    {
        'Trader Name': 'Atik Arnob',
        'Trader ID': 'T7792292023',
        'Location': 'Pilak, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '34',
    },
    {
        'Trader Name': 'Fahad Islam',
        'Trader ID': 'T7881392023',
        'Location': 'Hatia, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '32',
    },
    {
        'Trader Name': 'Abdul Karim',
        'Trader ID': 'T3031392023',
        'Location': 'Musapur, Noakhali',
        'Quantity': '170',
        'Price (Per KG)': '55',
    },


]












export default { sellingData, transactionData, traderSearch, expenseData, projectPriceOfferData };


