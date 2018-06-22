var ConversionFunc = {
	// Lengths functions: 

	'meterkilometer': function (value) {
	   return (Number(value) / 1000).toFixed(2);
	 },
	'metercentimeter': function (value) {
	   return (Number(value) * 100).toFixed(2);
	 },
	'metermillimeter': function (value) {
	   return (Number(value) * 1000).toFixed(2);
	 },
	'metermile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'meteryard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'meterfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'meterinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kilometermeter': function (value) {
	   return (Number(value) * 1000).toFixed(2);
	 },
	'kilometercentimeter': function (value) {
	   return (Number(value) * 100000).toFixed(2);
	 },
	'kilometermillimeter': function (value) {
	   return (Number(value) * 1000000).toFixed(2);
	 },
	'kilometermile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kilometeryard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kilometerfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kilometerinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'centimetermeter': function (value) {
	   return (Number(value) / 100).toFixed(2);
	 },
	'centimeterkilometer': function (value) {
	   return (Number(value) / 100000).toFixed(2);
	 },
	'centimetermillimeter': function (value) {
	   return (Number(value) * 10).toFixed(2);
	 },
	'centimetermile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'centimeteryard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'centimeterfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'centimeterinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'millimetermeter': function (value) {
	   return (Number(value) / 1000).toFixed(2);
	 },
	'millimeterkilometer': function (value) {
	   return (Number(value) / 1000000).toFixed(2);
	 },
	'millimetercentimeter': function (value) {
	   return (Number(value) / 10).toFixed(2);
	 },
	'millimetermile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'millimeteryard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'millimeterfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'millimeterinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'milemeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'milekilometer': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'milecentimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'milemillimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mileyard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'milefoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mileinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardkilometer': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardcentimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardmillimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'yardinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footkilometer': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footcentimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footmillimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footyard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'footinch': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchkilometer': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchcentimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchmillimeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchyard': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'inchfoot': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Temperatures functions: 

	'celciuskelvin': function (value) {
	   return (Number(value) + 273.15).toFixed(2);
	 },
	'celciusfahrenheit': function (value) {
	   return ((9 / 5) * Number(value) + 32).toFixed(2);
	 },
	'kelvincelcius': function (value) {
	   return (Number(value) - 273.15).toFixed(2);
	 },
	'kelvinfahrenheit': function (value) {
	   return ((9 / 5) * Number(value) - 459.67).toFixed(2);
	 },
	'fahrenheitcelcius': function (value) {
	   return ((Number(value) - 32) * (5 / 9)).toFixed(2);
	 },
	'fahrenheitkelvin': function (value) {
	   return ((Number(value) + 459.67) * (5 / 9)).toFixed(2);
	 },
 
	// Areas functions: 

	'sqmsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqkmsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqcmsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmmsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctracre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'hctrsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acrehctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'acresqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilehctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmileacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqmilesqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqyrdsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqfthctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqftsqin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinhctr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinacre': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'sqinsqft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Volumes functions: 

	'cbmetercbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeteruspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeteruscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbkmcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbcmcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmmcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliteruspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliteruscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usquartcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgallonimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impgalloncbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impquartcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imppintcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'impflozcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptbspcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'imptspcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilemliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmileimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmilecbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrduspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrduscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbin': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbkm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbcm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbmm': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinusquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinuspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinuscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimpgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimpquart': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimppint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimpfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimptbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbinimptsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbmile': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbincbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Weights functions: 

	'kggr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kgmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kgmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kglton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kgston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kglbs': function (value) {
	   return (Number(value) / 0.45359237).toFixed(2);
	 },
	'kgoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kgcarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kgamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grlton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'groz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'grcarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'gramu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mggr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mglton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mglbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgcarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mgamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtongr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonlton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtoncarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mtonamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltongr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltoncarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ltonamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stongr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonlton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stoncarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'stonamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbskg': function (value) {
	   return (Number(value) * 0.45359237).toFixed(2);
	 },
	'lbsgr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbsmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbsmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbslton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbsston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbsoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbscarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'lbsamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozgr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozlton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozcarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ozamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratkg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratgr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratmg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratmton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratlton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratlbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'carratamu': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amukg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amugr': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amumg': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amumton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amulton': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amuston': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amulbs': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amuoz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'amucarrat': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Speeds functions: 

	'mskmh': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'msknots': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'msmph': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kmhms': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'kmhknots': function (value) {
	   return (Number(value) / 1.852).toFixed(2);
	 },
	'kmhmph': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'knotsms': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'knotskmh': function (value) {
	   return (Number(value) * 1.852).toFixed(2);
	 },
	'knotsmph': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mphms': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mphkmh': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mphknots': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Consumptions functions: 

	'lp100mpg': function (value) {
	   return (235.2145843 / Number(value)).toFixed(2);
	 },
	'mpglp100': function (value) {
	   return (235.2145843 / Number(value)).toFixed(2);
	 }
};