var ConversionFunc = {
	// Lengths functions: 

	'meterkilometer': function (value) {
	   return (Number(value) / 1000).toFixed(3);
	 },
	'metercentimeter': function (value) {
	   return (Number(value) * 100).toFixed(3);
	 },
	'metermillimeter': function (value) {
	   return (Number(value) * 1000).toFixed(3);
	 },
	'metermile': function (value) {
	   return (Number(value) / 1609.344).toFixed(3);
	 },
	'meteryard': function (value) {
	   return (Number(value) * 3.048 / 3).toFixed(3);
	 },
	'meterfoot': function (value) {
	   return (Number(value) * 3.048).toFixed(3);
	 },
	'meterinch': function (value) {
	   return (Number(value) / 0.0254 ).toFixed(3);
	 },
	'kilometermeter': function (value) {
	   return (Number(value) * 1000).toFixed(3);
	 },
	'kilometercentimeter': function (value) {
	   return (Number(value) * 100000).toFixed(3);
	 },
	'kilometermillimeter': function (value) {
	   return (Number(value) * 1000000).toFixed(3);
	 },
	'kilometermile': function (value) {
	   return (Number(value) / 1.609344).toFixed(3);
	 },
	'kilometeryard': function (value) {
	   return (Number(value) * 3048 / 3).toFixed(3);
	 },
	'kilometerfoot': function (value) {
	   return (Number(value) * 3048).toFixed(3);
	 },
	'kilometerinch': function (value) {
	   return (Number(value) / 0.0000254 ).toFixed(3);
	 },
	'centimetermeter': function (value) {
	   return (Number(value) / 100).toFixed(3);
	 },
	'centimeterkilometer': function (value) {
	   return (Number(value) / 100000).toFixed(3);
	 },
	'centimetermillimeter': function (value) {
	   return (Number(value) * 10).toFixed(3);
	 },
	'centimetermile': function (value) {
	   return (Number(value) / 160934.4).toFixed(3);
	 },
	'centimeteryard': function (value) {
	   return (Number(value) * 0.03048 / 3).toFixed(3);
	 },
	'centimeterfoot': function (value) {
	   return (Number(value) / 30.48).toFixed(3);
	 },
	'centimeterinch': function (value) {
	   return (Number(value) / 2.54).toFixed(3);
	 },
	'millimetermeter': function (value) {
	   return (Number(value) / 1000).toFixed(3);
	 },
	'millimeterkilometer': function (value) {
	   return (Number(value) / 1000000).toFixed(3);
	 },
	'millimetercentimeter': function (value) {
	   return (Number(value) / 10).toFixed(3);
	 },
	'millimetermile': function (value) {
	   return (Number(value) / 1609344).toFixed(3);
	 },
	'millimeteryard': function (value) {
	   return (Number(value) * 0.003048 / 3).toFixed(3);
	 },
	'millimeterfoot': function (value) {
	   return (Number(value) / 304.8).toFixed(3);
	 },
	'millimeterinch': function (value) {
	   return (Number(value) / 25.4).toFixed(3);
	 },
	'milemeter': function (value) {
	   return (Number(value) * 1609.344).toFixed(3);
	 },
	'milekilometer': function (value) {
	   return (Number(value) * 1.609344).toFixed(3);
	 },
	'milecentimeter': function (value) {
	   return (Number(value) * 160934.4).toFixed(3);
	 },
	'milemillimeter': function (value) {
	   return (Number(value) * 1609344).toFixed(3);
	 },
	'mileyard': function (value) {
	   return (Number(value) * 1760).toFixed(3);
	 },
	'milefoot': function (value) {
	   return (Number(value) * 5280).toFixed(3);
	 },
	'mileinch': function (value) {
	   return (Number(value) * 63360).toFixed(3);
	 },
	'yardmeter': function (value) {
	   return (Number(value) / 3.048 * 3).toFixed(3);
	 },
	'yardkilometer': function (value) {
	   return (Number(value) / 3048 * 3).toFixed(3);
	 },
	'yardcentimeter': function (value) {
	   return (Number(value) / 0.03048 * 3).toFixed(3);
	 },
	'yardmillimeter': function (value) {
	   return (Number(value) / 0.003048 * 3).toFixed(3);
	 },
	'yardmile': function (value) {
	   return (Number(value) / 1760).toFixed(3);
	 },
	'yardfoot': function (value) {
	   return (Number(value) * 3).toFixed(3);
	 },
	'yardinch': function (value) {
	   return (Number(value) * 36).toFixed(3);
	 },
	'footmeter': function (value) {
	   return (Number(value) * 0.3048).toFixed(3);
	 },
	'footkilometer': function (value) {
	   return (Number(value) * 0.0003048).toFixed(3);
	 },
	'footcentimeter': function (value) {
	   return (Number(value) * 30.48).toFixed(3);
	 },
	'footmillimeter': function (value) {
	   return (Number(value) * 304.8).toFixed(3);
	 },
	'footmile': function (value) {
	   return (Number(value) / 5280).toFixed(3);
	 },
	'footyard': function (value) {
	   return (Number(value) / 3).toFixed(3);
	 },
	'footinch': function (value) {
	   return (Number(value) * 12).toFixed(3);
	 },
	'inchmeter': function (value) {
	   return (Number(value) * 0.0254).toFixed(3);
	 },
	'inchkilometer': function (value) {
	   return (Number(value) * 0.0000254).toFixed(3);
	 },
	'inchcentimeter': function (value) {
	   return (Number(value) * 2.54).toFixed(3);
	 },
	'inchmillimeter': function (value) {
	   return (Number(value) * 25.4).toFixed(3);
	 },
	'inchmile': function (value) {
	   return (Number(value) / 63360).toFixed(3);
	 },
	'inchyard': function (value) {
	   return (Number(value) / 36).toFixed(3);
	 },
	'inchfoot': function (value) {
	   return (Number(value) / 12).toFixed(3);
	 },
 
	// Temperatures functions: 

	'celciuskelvin': function (value) {
	   return (Number(value) + 273.15).toFixed(3);
	 },
	'celciusfahrenheit': function (value) {
	   return ((9 / 5) * Number(value) + 32).toFixed(3);
	 },
	'kelvincelcius': function (value) {
	   return (Number(value) - 273.15).toFixed(3);
	 },
	'kelvinfahrenheit': function (value) {
	   return ((9 / 5) * Number(value) - 459.67).toFixed(3);
	 },
	'fahrenheitcelcius': function (value) {
	   return ((Number(value) - 32) * (5 / 9)).toFixed(3);
	 },
	'fahrenheitkelvin': function (value) {
	   return ((Number(value) + 459.67) * (5 / 9)).toFixed(3);
	 },
 
	// Areas functions: 

	'sqmhctr': function (value) {
	   return (Number(value) / 10000).toFixed(3);
	 },
	'sqmacre': function (value) {
	   return (Number(value) / 4046.86).toFixed(3);
	 },
	'sqmsqmile': function (value) {
	   return (Number(value) / 2589988).toFixed(3);
	 },
	'sqmsqft': function (value) {
	   return (Number(value) * 10.76391).toFixed(3);
	 },
	'sqmsqin': function (value) {
	   return (Number(value) * 1550.003).toFixed(3);
	 },
	'hctrsqm': function (value) {
	   return (Number(value) * 10000).toFixed(3);
	 },
	'hctracre': function (value) {
	   return (Number(value) * 2.471052).toFixed(3);
	 },
	'hctrsqmile': function (value) {
	   return (Number(value) / 258.9988).toFixed(3);
	 },
	'hctrsqft': function (value) {
	   return (Number(value) * 107639.1).toFixed(3);
	 },
	'hctrsqin': function (value) {
	   return (Number(value) * 15500030).toFixed(3);
	 },
	'acresqm': function (value) {
	   return (Number(value) * 4046.86).toFixed(3);
	 },
	'acrehctr': function (value) {
	   return (Number(value) / 2.471052).toFixed(3);
	 },
	'acresqmile': function (value) {
	   return (Number(value) / 639.9994).toFixed(3);
	 },
	'acresqft': function (value) {
	   return (Number(value) * 43560.04).toFixed(3);
	 },
	'acresqin': function (value) {
	   return (Number(value) * 6272646).toFixed(3);
	 },
	'sqmilesqm': function (value) {
	   return (Number(value) * 2589988).toFixed(3);
	 },
	'sqmilehctr': function (value) {
	   return (Number(value) * 258.9988).toFixed(3);
	 },
	'sqmileacre': function (value) {
	   return (Number(value) * 639.9994).toFixed(3);
	 },
	'sqmilesqft': function (value) {
	   return (Number(value) * 27878400).toFixed(3);
	 },
	'sqmilesqin': function (value) {
	   return (Number(value) * 4014490000).toFixed(3);
	 },
	'sqftsqm': function (value) {
	   return (Number(value) / 10.76391).toFixed(3);
	 },
	'sqfthctr': function (value) {
	   return (Number(value) / 107639.1).toFixed(3);
	 },
	'sqftacre': function (value) {
	   return (Number(value) / 43560.04).toFixed(3);
	 },
	'sqftsqmile': function (value) {
	   return (Number(value) / 27878400).toFixed(3);
	 },
	'sqftsqin': function (value) {
	   return (Number(value) * 144).toFixed(3);
	 },
	'sqinsqm': function (value) {
	   return (Number(value) / 1550.003).toFixed(3);
	 },
	'sqinhctr': function (value) {
	   return (Number(value) / 15500030).toFixed(3);
	 },
	'sqinacre': function (value) {
	   return (Number(value) / 6272646).toFixed(3);
	 },
	'sqinsqmile': function (value) {
	   return (Number(value) / 4014490000).toFixed(3);
	 },
	'sqinsqft': function (value) {
	   return (Number(value) / 144).toFixed(3);
	 },
	 
	// Volumes functions: 

	'cbmeterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmeterusgallon': function (value) {
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
	'cbmetercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbmetercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'literusgallon': function (value) {
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
	'litercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'litercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dlitercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dlitercliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dlitermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliterusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliteruspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliteruscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliterusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliterustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dliterustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dlitercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'dlitercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'clitercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'clitermliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterusgallon': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliteruspint': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliteruscup': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterusfloz': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterustbsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cliterustsp': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'clitercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'clitercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mliterusgallon': function (value) {
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
	'mlitercbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'mlitercbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallondliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgallonmliter': function (value) {
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
	'usgalloncbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usgalloncbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintusgallon': function (value) {
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
	'uspintcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uspintcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupusgallon': function (value) {
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
	'uscupcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'uscupcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozusgallon': function (value) {
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
	'usflozcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'usflozcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspusgallon': function (value) {
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
	'ustbspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustbspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspusgallon': function (value) {
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
	'ustspcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'ustspcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrddliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbyrdusgallon': function (value) {
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
	'cbyrdcbft': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcbmeter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftdliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftcliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftmliter': function (value) {
	   return (Number(value)).toFixed(2);
	 },
	'cbftusgallon': function (value) {
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
	'cbftcbyrd': function (value) {
	   return (Number(value)).toFixed(2);
	 },
 
	// Weights functions: 

	'kggr': function (value) {
	   return (Number(value) * 1000).toFixed(3);
	 },
	'kgmg': function (value) {
	   return (Number(value) * 1000000).toFixed(3);
	 },
	'kglbs': function (value) {
	   return (Number(value) / 0.45359237).toFixed(3);
	 },
	'kgoz': function (value) {
	   return (Number(value) / 0.028349).toFixed(3);
	 },
	'grkg': function (value) {
	   return (Number(value) / 1000).toFixed(3);
	 },
	'grmg': function (value) {
	   return (Number(value) * 10).toFixed(3);
	 },
	'grlbs': function (value) {
	   return (Number(value) / 453.59237).toFixed(3);
	 },
	'groz': function (value) {
	   return (Number(value) / 28.349 ).toFixed(3);
	 },
	'mgkg': function (value) {
	   return (Number(value) / 100000).toFixed(3);
	 },
	'mggr': function (value) {
	   return (Number(value) / 1000).toFixed(3);
	 },
	'mglbs': function (value) {
	   return (Number(value) / 453592.37).toFixed(3);
	 },
	'mgoz': function (value) {
	   return (Number(value) / 28349).toFixed(3);
	 },
	'lbskg': function (value) {
	   return (Number(value) * 0.45359237).toFixed(3);
	 },
	'lbsgr': function (value) {
	   return (Number(value) * 453.59237).toFixed(3);
	 },
	'lbsmg': function (value) {
	   return (Number(value) * 453592.37).toFixed(3);
	 },
	'lbsoz': function (value) {
	   return (Number(value) * 16).toFixed(3);
	 },
	'ozkg': function (value) {
	   return (Number(value) * 0.028349 ).toFixed(3);
	 },
	'ozgr': function (value) {
	   return (Number(value) * 28.349 ).toFixed(3);
	 },
	'ozmg': function (value) {
	   return (Number(value) * 28349 ).toFixed(3);
	 },
	'ozlbs': function (value) {
	   return (Number(value) / 16 ).toFixed(3);
	 },
 
	// Speeds functions: 

	'mskmh': function (value) {
	   return (Number(value) * 3.6).toFixed(3);
	 },
	'msknots': function (value) {
	   return (Number(value) * 1.943844).toFixed(3);
	 },
	'msmph': function (value) {
	   return (Number(value) / 0.44704).toFixed(3);
	 },
	'kmhms': function (value) {
	   return (Number(value) / 3.6).toFixed(3);
	 },
	'kmhknots': function (value) {
	   return (Number(value) / 1.852).toFixed(3);
	 },
	'kmhmph': function (value) {
	   return (Number(value) / 1.609344).toFixed(3);
	 },
	'knotsms': function (value) {
	   return (Number(value) / 1.943844).toFixed(3);
	 },
	'knotskmh': function (value) {
	   return (Number(value) * 1.852).toFixed(3);
	 },
	'knotsmph': function (value) {
	   return (Number(value) * 1.152).toFixed(3);
	 },
	'mphms': function (value) {
	   return (Number(value) * 0.44704).toFixed(3);
	 },
	'mphkmh': function (value) {
	   return (Number(value) * 1.609344).toFixed(3);
	 },
	'mphknots': function (value) {
	   return (Number(value) / 1.152).toFixed(3);
	 },
 
	// Consumptions functions: 

	'lp100mpg': function (value) {
	   return (235.2145843 / Number(value)).toFixed(3);
	 },
	'mpglp100': function (value) {
	   return (235.2145843 / Number(value)).toFixed(3);
	 }
};