	// Constructor of catData
	//
	function catData() {
		this.nodes = new Array();
	}

	//
	// Function to assign the JSON structure
	//
	catData.prototype.newNode = function( nodeId, dataObj ) {
		this.nodes[ nodeId ] = dataObj;
	}
	
	//
	// Function used to determine if the parameter is an array or not
	//
	function isArray( obj ) {
		if ( obj !== null ) {
			if ( obj.constructor.toString().indexOf( "Array" ) == -1 )
				return false;
			else
				return true;
		}
	}

	// Return the value of an attribute
	// Takes arguments: categoryId (required), attribute (required), nodeId (required)
	// Attribute can be attributeId, display name, or display name of the form field
	// The function will determine whether a name or Id is passed and take the appropriate action
	//
	catData.prototype.getAttrValue = function( categoryId, attribute, nodeId ) {
		var attributeValue;						// Return from the function
		var attributeValues = new Array();		// Array to hold the attribute values

		if ( nodeId == null || nodeId == "" || nodeId < 0 || isNaN( nodeId ) ) {
			// The nodeId supplied is not valid
			return null;
		}

		if ( categoryId == null || categoryId == "" || categoryId < 0 || isNaN( categoryId ) ) {
			// The categoryId supplied is not valid
			return null;
		}

		if ( this.nodes == null ) {
			// The array is null or empty
			return null;
		}

		if ( attribute == null || attribute == "" ) {
			// The attribute was not specified
			return null;
		}

		// Determine what type of attribute was passed to the function
		// Use regular expressions to determine
		//
		var pattern = /^_\d_\d_/;			// Attribute starts with '_x_x_' where x is a digit - display name of the form field
		var pattern2 = /[a-zA-Z]/;			// Any letter in the string - display name
		var pattern3 = /[0-9]/;				// Any digit - attributeId

		// Case where the display name of the form field was passed as an argument
		if ( pattern.test( attribute ) ) {
			// Call function that will retrieve the attribute value based on the display name of the form field
			attributeValue = this.getAttrValueByFormField( categoryId, attribute, nodeId );
			return attributeValue;
		} else if ( pattern2.test( attribute ) ) {
			attributeValues = this.getAttrValueByDispName( categoryId, attribute, nodeId );

			if ( attributeValues.length == 1 ) {
				if ( isArray( attributeValues[ 0 ] ) ) {
					// Case where there is only 1 row in the set and it is returned
					// Check this by calling the isArray function
					return attributeValues;
				} else {
					// Return 1 value (i.e. not an array)
					attributeValue = attributeValues[ 0 ];
					return attributeValue;
				}
			} else if ( attributeValues.length > 1 ) {
				return attributeValues;
			} else {
				return null;
			}
		} else if ( pattern3.test( attribute ) ) {
			attributeValues = this.getAttrValueByAttrId( categoryId, attribute, nodeId );

			if ( attributeValues.length == 1 ) {
				if ( isArray(attributeValues[ 0 ]) ) {
					// Case where there is only 1 row in the set and it returns a multi-value attribute
					return attributeValues;
				} else {
					// Return 1 value (I.e. not an array)
					attributeValue = attributeValues[ 0 ];
					return attributeValue;
				}			
			} else if ( attributeValues.length > 1 ) {
				return attributeValues;
			} else {
				return null;
			}
		} else {
			// Attribute parameter is invalid
			return null;
		}
	} // end of function getAttrValue

	// Returns the attribute name
	// Takes arguments: categoryId (required), attributeId (required), nodeId (optional)
	// If nodeId is specified, the function will return faster
	// If nodeId is not specified, finds a categoryId that matches and returns the attribute name
	//
	catData.prototype.getAttrName = function( categoryId, attributeId, nodeId ) {
		var attributeName;		// Variable to hold the attribute name

		if ( categoryId == null || categoryId == "" || categoryId < 0 || isNaN( categoryId ) ) {
			// The categoryId supplied is not valid
			return null;
		}

		if ( ( attributeId == null ) || ( attributeId == "" ) || ( isNaN( attributeId ) ) ) {
			// The attributeId supplied is not valid
			return null;
		}

		if ( this.nodes == null ) {
			// The array is null or empty
			return null;
		}

		// Case where a nodeId is specified by the user
		if ( nodeId != "" && nodeId != null ) {
			if ( nodeId < 0 || isNaN( nodeId ) ) {
				// An invalid nodeId parameter is specified
				return null;
			}

			if ( this.nodes[ nodeId ] == null ) {
				// nodeId is not found in the JS array
				return null;
			}

			thisNode = this.nodes[ nodeId ];

			if ( thisNode[ categoryId ] == null ) {
				// categoryId is not found in the JS array
				return null;
			}

			// cycle through the attributes
			for ( attid in thisNode[ categoryId ].attr_data ) {
				// just look at regular attributes and multi-value attributes in this branch
				if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
					if ( attid == attributeId ) {
						// return the attribute name
						attributeName = thisNode[ categoryId ].attr_data[ attid ].name;
						return attributeName;
					}
				// look at a set or a multi-value set in this branch
				} else {
					if ( attid == attributeId ) {
						// return the attribute (set) name
						attributeName = thisNode[ categoryId ].attr_data[ attid ].name;
						return attributeName;
					}

					// cycle through the sets - one itteration for a regular set and multiple for multi-value sets
					for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
						// cycle  through the attributes in the set
						for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
							if ( setattr == attributeId ) {
								// return the name of the attribute in the set
								attributeName = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].name;
								return attributeName;
							}
						} // end of cycle through the attributes in the set
					} // end of cycle through the sets
				} // end of else statement
			} // end of cycle through the attributes

			// Nothing found
			return null;
		} else {
			// Case where nodeId not specified by the user
		
			// cycle through the nodes
			for( nodeid in this.nodes ) {
				thisNode = this.nodes[ nodeid ];
				
				// cycle categories on the nodes
				for ( catid in thisNode ) {
					if ( catid == categoryId ) {
						// cycle through the attributes
						for ( attid in thisNode[ categoryId ].attr_data ) {
							// just look at regular attributes and multi-value attributes in this branch
							if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
								if ( attid == attributeId ) {
									// return the attribute name
									attributeName = thisNode[ categoryId ].attr_data[ attid ].name;
									return attributeName;
								}
							// look at a set or a multi-value set in this branch
							} else {
								if ( attid == attributeId ) {
									// return the attribute (set) name
									attributeName = thisNode[ categoryId ].attr_data[ attid ].name;
									return attributeName;
								}

								// cycle through the sets - one iteration for a regular set and multiple for multi-value sets
								for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
									// cycle  through the attributes in the set
									for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
										if ( setattr == attributeId ) {
											// return the name of the attribute in the set
											attributeName = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].name;
											return attributeName;
										}
									} // end of cycle through the attributes in the set
								} // end of cycle through the sets
							} // end of else statement
						} // end of cycle through the attributes
					} // end of if statement
				} // cycle through catid
			} // cycle through nodeId

			return null;
		} // end of else statement
	} // end of function getAttrName

	// Function to get the name of the category.
	// Find a node that has this category id applied and return the category name
	// Takes arguments: categoryId (mandatory), nodeId (optional)
	// Returns the name of the category or null if an invalid parameter is supplied or the category name is not found.
	//
	catData.prototype.getCatName = function( categoryId, nodeId ) {
		var catName;		// Variable to hold the category name

		if ( this.nodes == null ) {
			// The array is null or empty
			return null;
		}

		if ( categoryId == null || categoryId == "" || categoryId < 0 || isNaN( categoryId ) ) {
			// The categoryId supplied is not valid
			return null;
		}

		// Case where a nodeId is specified by the user
		if ( nodeId != "" && nodeId != null ) {
			if ( nodeId < 0 || isNaN( nodeId ) ) {
				// An invalid nodeId parameter is specified
				return null;
			} else {
				// Valid nodeId was specified, find and return the category name
				thisNode = this.nodes[ nodeId ];

				if ( thisNode == null ) {
					// nodeId is not found in the JS array
					return null;
				} else {
					// cycle categories on the nodes
					for ( catid in thisNode ) {
						if ( catid == categoryId ) {
							catName = thisNode[ categoryId ].name;
							return catName;
						}
					} // cycle through catid

					// The categoryId was not found in the JS array.
					return null;
				}
			}
		} else {
			// Case where nodeId not specified by the user

			// cycle through the nodes
			for( nodeid in this.nodes ) {
				thisNode = this.nodes[ nodeid ];
				
				// cycle categories on the nodes
				for ( catid in thisNode ) {
					if ( catid == categoryId ) {
						catName = thisNode[ categoryId ].name;
						return catName;
					}
				} // cycle through catid
			} // cycle through nodeId

			// The categoryId specified by the user was not found in the JS array
			return null;
		}
	} // End of function getCatName

	// Returns a JS array with the form name fields and values (I.e. '_1_1_5_2_6_1', James)
	// Everything you need to make a submission of the category data
	// Arguments: categoryId (mandatory), nodeId (mandatory)
	//
	catData.prototype.getAttrNameValuePairs = function( categoryId, nodeId ) {
		var nameValuePairs = new Array();	// Array to hold the name - value pairs

		if ( nodeId == null || nodeId == "" || nodeId < 0 || isNaN( nodeId ) ) {
			// The nodeId supplied is not valid
			return null;
		}

		if ( categoryId == null || categoryId == "" || categoryId < 0 || isNaN( categoryId ) ) {
			// The categoryId supplied is not valid
			return null;
		}

		if ( this.nodes == null ) {
			// The array is null or empty
			return null;
		}

		// Check that nodeId is valid and exists in the array
		if ( this.nodes[ nodeId ] == null ) {
			// nodeId is not found in the JS array
			return null;
		}

		thisNode = this.nodes[ nodeId ];

		// Check that categoryId is valid and exists in the array
		if ( thisNode[ categoryId ] == null ) {
			// categoryId is not found in the JS array
			return null;
		}

		// cycle through the attributes
		attrData = thisNode[ categoryId ].attr_data;

		for ( attid in attrData ) {
			// just look at regular attributes and multi-value attributes in this branch
			if ( attrData[ attid ].set == false ) {
				// cycle through the values array
				attrVals = attrData[ attid ].values;

				for ( valpairs = 0; valpairs < attrVals.length; valpairs++ )  {
					// Push the name/value pair into the array
					nameValuePairs.push( attrVals[ valpairs ] );
				} // end of cycle through the values array
			// look at a set or a multi-value set in this branch
			} else {
				// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
				setAttrData = attrData[ attid ].attr_data
				
				for ( set in setAttrData ) {
					// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
					for ( setattr in setAttrData[ set ] ) {
						// cycle through the values array
						attrVals = setAttrData[ set ][ setattr ].values;

						for ( valpairs = 0; valpairs < attrVals.length; valpairs++ ) {
							// Push the name/value pair from the set into the array
							nameValuePairs.push( attrVals[ valpairs ] );
						} // end of cycle through the values array
					} // end cycle through the attributes
				} // end cycle through the sets
			} // end of else statement
		} // cycle through the attributes

		if ( nameValuePairs.length == 0 ) {
			// No name/value pairs were found in the cat_data array
			return null;
		} else {
			// Return the array to the user
			return nameValuePairs;
		}
	} // End of function getAttrNameValuePairs

	// Retrieves attribute information based on the field name specified
	// Takes arguments: categoryId (required), attributeId (required), fieldName (required), nodeId (optional)
	// fieldName - should be one of the following: 'req', 'type', 'len', 'maxlen', 'rows', 'maxrows', 'multi', 'set'
	// nodeId is optional but will run much faster if specified
	//
	catData.prototype.getAttrDataByField = function( categoryId, attributeId, fieldName, nodeId ) {
		var fieldData = "";			// variable to hold the data and to return to the user

		if ( categoryId == null || categoryId == "" || categoryId < 0 || isNaN( categoryId ) ) {
			// The categoryId supplied is not valid
			return null;
		}

		if ( attributeId == null || attributeId == "" || attributeId < 2 || isNaN( attributeId ) ) {
			// The attributeId supplied is not valid
			return null;
		}

		if ( this.nodes == null ) {
			// The array is null or empty
			return null;
		}

		if ( fieldName == "" || fieldName == null ) {
			// The field name was not specified
			return null;
		}

		// Case where a nodeId is specified by the user
		if ( nodeId != "" && nodeId != null ) {
			if ( nodeId < 0 || isNaN( nodeId ) ) {
				// An invalid nodeId parameter is specified
				return null;
			}

			if ( this.nodes[ nodeId ] == null ) {
				// nodeId is not found in the JS array
				return null;
			}

			thisNode = this.nodes[ nodeId ];

			// Check that categoryId is valid and exists in the array
			if ( thisNode[ categoryId ] == null ) {
				// categoryId is not found in the JS array
				return null;
			}

			// cycle through the attributes
			for ( attid in thisNode[ categoryId ].attr_data ) {
				// just look at regular attributes
				if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
					if ( attid == attributeId ) {
						if ( fieldName == 'req' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].req;
							return fieldData;
						} else if ( fieldName == 'type' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].type;
							return fieldData;
						} else if ( fieldName == 'len' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].len;
							return fieldData;
						} else if ( fieldName == 'maxlen' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].maxlen;
							return fieldData;
						} else if ( fieldName == 'rows' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].rows;
							return fieldData;
						} else if ( fieldName == 'maxrows' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].maxrows;
							return fieldData;
						} else if ( fieldName == 'multi' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].multi;
							return fieldData;
						} else if ( fieldName == 'set' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].set;
							return fieldData;
						} else {
							// Field name not specified correctly
							return null;
						}
					} // end of attid == attributeId
				// look at a set or a multi-value set in this branch
				} else {
					if ( attid == attributeId ) {
						// Case where the attribute that defines the set is specified as the attributeId
						if ( fieldName == 'req' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].req;
							return fieldData;
						} else if ( fieldName == 'type' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].type;
							return fieldData;
						} else if ( fieldName == 'len' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].len;
							return fieldData;
						} else if ( fieldName == 'maxlen' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].maxlen;
							return fieldData;
						} else if ( fieldName == 'rows' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].rows;
							return fieldData;
						} else if ( fieldName == 'maxrows' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].maxrows;
							return fieldData;
						} else if ( fieldName == 'multi' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].multi;
							return fieldData;
						} else if ( fieldName == 'set' ) {
							fieldData = thisNode[ categoryId ].attr_data[ attid ].set;
							return fieldData;
						} else {
							// Field name not specified correctly
							return null;
						}
					} // end of attid == attributeId

					// Looking at attributes within the set
					// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
					for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
						// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
						for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
							if ( setattr == attributeId ) {
								// Please note: attributes within the set do not have the set field defined
								if ( fieldName == 'req' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].req;
									return fieldData;
								} else if ( fieldName == 'type' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].type;
									return fieldData;
								} else if ( fieldName == 'len' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].len;
									return fieldData;
								} else if ( fieldName == 'maxlen' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].maxlen;
									return fieldData;
								} else if ( fieldName == 'rows' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].rows;
									return fieldData;
								} else if ( fieldName == 'maxrows' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].maxrows;
									return fieldData;
								} else if ( fieldName == 'multi' ) {
									fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].multi;
									return fieldData;
								} else {
									// Field name not specified correctly
									return null;
								}
							}
						} // end cycle through the attributes
					} // end cycle through the sets
				} // end of else statement
			} // cycle through the attributes

			// Nothing found in cat_data
			return null;
		} else {
			// Case where nodeId not specified by the user, we will need to iterate thru all nodeIds and categoryIds
	
			// cycle through the nodes
			for( nodeid in this.nodes ) {
				thisNode = this.nodes[ nodeid ];
				
				// cycle categories on the nodes
				for ( catid in thisNode ) {
					if ( catid == categoryId ) {
						// cycle through the attributes
						for ( attid in thisNode[ categoryId ].attr_data ) {
							// just look at regular attributes
							if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
								if ( attid == attributeId ) {
									if ( fieldName == 'req' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].req;
										return fieldData;
									} else if ( fieldName == 'type' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].type;
										return fieldData;
									} else if ( fieldName == 'len' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].len;
										return fieldData;
									} else if ( fieldName == 'maxlen' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].maxlen;
										return fieldData;
									} else if ( fieldName == 'rows' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].rows;
										return fieldData;
									} else if ( fieldName == 'maxrows' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].maxrows;
										return fieldData;
									} else if ( fieldName == 'multi' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].multi;
										return fieldData;
									} else if ( fieldName == 'set' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].set;
										return fieldData;
									} else {
										// Field name not specified correctly
										return null;
									}
								}
							// look at a set or a multi-value set in this branch
							} else {
								if ( attid == attributeId ) {
									// Case where the attribute that defines the set is specified as the attributeId
									if ( fieldName == 'req' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].req;
										return fieldData;
									} else if ( fieldName == 'type' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].type;
										return fieldData;
									} else if ( fieldName == 'len' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].len;
										return fieldData;
									} else if ( fieldName == 'maxlen' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].maxlen;
										return fieldData;
									} else if ( fieldName == 'rows' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].rows;
										return fieldData;
									} else if ( fieldName == 'maxrows' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].maxrows;
										return fieldData;
									} else if ( fieldName == 'multi' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].multi;
										return fieldData;
									} else if ( fieldName == 'set' ) {
										fieldData = thisNode[ categoryId ].attr_data[ attid ].set;
										return fieldData;
									} else {
										// Field name not specified correctly
										return null;
									}
								}

								// Looking at attributes within the set
								// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
								for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
									// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
									for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
										if ( setattr == attributeId ) {
											// Please note: attributes within the set do not have the set field defined
											if ( fieldName == 'req' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].req;
												return fieldData;
											} else if ( fieldName == 'type' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].type;
												return fieldData;
											} else if ( fieldName == 'len' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].len;
												return fieldData;
											} else if ( fieldName == 'maxlen' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].maxlen;
												return fieldData;
											} else if ( fieldName == 'rows' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].rows;
												return fieldData;
											} else if ( fieldName == 'maxrows' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].maxrows;
												return fieldData;
											} else if ( fieldName == 'multi' ) {
												fieldData = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].multi;
												return fieldData;
											} else {
												// Field name not specified correctly
												return null;
											}
										}
									} // end cycle through the attributes
								} // end cycle through the sets
							} // end of else statement
						} // cycle through the attributes
					} // end of if statement - catid == categoryId
				} // cycle through catid
			} // cycle through nodeId

			// Nothing found
			return null;
		} // end of else statement
	} // End of getAttrDataByField function

	// Return the value(s) of an attribute based on the attributeId
	// Takes arguments: categoryId (required), attribute (required), nodeId (required)
	// Attribute is the attributeId in the category. Starts from 2,3,4,etc...
	// If the attribute is multi-value, it returns the values in an array.
	// If the attribute is multi-value in a multi-value set, an array of arrays is returned. I.e. [ [1,2,3], [2], [4,6,8] ]
	//
	catData.prototype.getAttrValueByAttrId = function( categoryId, attribute, nodeId ) {

		var attributeValues = new Array();		// Array to hold the attribute values

		// Check that nodeId is valid and exists in the array
		if ( this.nodes[ nodeId ] == null ) {
			// nodeId is not found in the JS array
			return attributeValues;
		}

		thisNode = this.nodes[ nodeId ];

		// Check that categoryId is valid and exists in the array
		if ( thisNode[ categoryId ] == null ) {
			// categoryId is not found in the JS array
			return attributeValues;
		}

		// Cycle through the attributes on the top level only
		for ( attid in thisNode[ categoryId ].attr_data ) {
			// just look at regular attributes and multi-value attributes in this branch
			if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
				if ( attid == attribute ) {
					if ( thisNode[ categoryId ].attr_data[ attid ].multi == false ) {
						// regular attribute
						attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].values[ 0 ][ 1 ] );
						return attributeValues;
					} else {
						// cycle through the values array
						for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].values ) {
							// multi-value attribute
							attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].values[ valpairs ][ 1 ] );
						} // end of cycle through the values array

						return attributeValues;
					}
				}
			}
		} // End of cycle through the attributes on the top level

		// This temp array will hold the values of a multi-value attribute, in a multi-value set
		// Later, this temp array will be pushed onto the main array being returned
		var tempArray = new Array();

		// cycle through the attributes in the set (traverse the set)
		for ( attid in thisNode[ categoryId ].attr_data ) {
			// Just look at a set
			if ( thisNode[ categoryId ].attr_data[ attid ].set == true ) {
				// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
				for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
					// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
					for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
						// Check to see if the ids match
						if ( setattr == attribute ) {
							if ( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].multi == true ) {
								// cycle through the values array
								for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values ) {
									// multi-value attribute
									tempArray.push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ valpairs ][ 1 ] );
								} // end of cycle through the values array
							} else {
								// regular attribute
								attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ 0 ][ 1 ] );
							}
						}

						if ( tempArray.length > 0 ) {
							// Multi-value attribute found in the set, push these attribute values to the array
							attributeValues.push( tempArray );
							tempArray = new Array();			// Clear the tempArray
						}
					} // end cycle through the attributes in the set
				} // end cycle through the sets
			} // end of just look at sets
		} // End of cycle through the attributes in the set (traverse the set)

		if ( attributeValues.length > 0 ) {
			return attributeValues;
		} else {
			// An attribute with the attributeId specified was not found
			return attributeValues;
		}
	}

	// Return the value(s) of an attribute
	// Takes arguments: categoryId (required), attribute (required), nodeId (required)
	// Attribute is the display name in the category. It must be case-sensitive for the function to return a value(s).
	// If the attribute is multi-value, it returns the values in an array.
	// If the attribute is multi-value in a multi-value set, an array of arrays is returned. I.e. [ [1,2,3], [2], [4,6,8] ]
	//
	catData.prototype.getAttrValueByDispName = function( categoryId, attribute, nodeId ) {
		var attributeValues = new Array();		// Array to hold the attribute values
		var setNamePassed = false;

		// Check that nodeId is valid and exists in the array
		if ( this.nodes[ nodeId ] == null ) {
			// nodeId is not found in the JS array
			return attributeValues;
		}

		thisNode = this.nodes[ nodeId ];

		// Check that categoryId is valid and exists in the array
		if ( thisNode[ categoryId ] == null ) {
			// categoryId is not found in the JS array
			return attributeValues;
		}

		// Cycle through the attributes on the top level only
		for ( attid in thisNode[ categoryId ].attr_data ) {
			if ( thisNode[ categoryId ].attr_data[ attid ].name == attribute && thisNode[ categoryId ].attr_data[ attid ].set == true ) {
				// Set name has been specified
				setNamePassed = true;
				break;
			}

			// just look at regular attributes and multi-value attributes in this branch
			if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
				if ( thisNode[ categoryId ].attr_data[ attid ].name == attribute ) {
					if ( thisNode[ categoryId ].attr_data[ attid ].multi == false ) {
						// regular attribute
						attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].values[ 0 ][ 1 ] );
						return attributeValues;
					} else {
						// cycle through the values array
						for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].values ) {
							// multi-value attribute
							attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].values[ valpairs ][ 1 ] );

						} // end of cycle through the values array

						return attributeValues;
					}
				}
			}
		} // End of cycle through the attributes on the top level

		// This temp array will hold the values of a multi-value attribute in a set
		// Later, this temp array will be pushed onto the main array being returned
		var tempArray = new Array();
		var i = 0;

		// Case where the Set Name (I.e. 'Tester Details' was passed in), return all attribute values in the set
		// Return multi-dimensional array [ [attrs in row 1], [attrs in row 2], [attrs in row 3], etc... ]
		if ( setNamePassed ) {
			// cycle through the attributes in the set (traverse the set)
			for ( attid in thisNode[ categoryId ].attr_data ) {
				if ( thisNode[ categoryId ].attr_data[ attid ].name == attribute && thisNode[ categoryId ].attr_data[ attid ].set == true ) {
					// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
					for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
						attributeValues[ i ] = new Array();

						// cycle through the attributes in the set (i.e. 6,7,8,9,etc)
						for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
							if ( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].multi == true ) {
								// cycle through the values array
								for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values ) {
									// multi-value attribute
									tempArray.push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ valpairs ][ 1 ] );
								} // end of cycle through the values array

								attributeValues[ i ].push( tempArray );
							} else {
								// regular attribute
								attributeValues[ i ].push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ 0 ][ 1 ] );
							}

							if ( tempArray.length > 0 ) {
								tempArray = new Array();			// Clear the tempArray
							}
						} // end cycle through the attributes in the set

						i = i+1;		// Increment the counter to indicate the next row of attributes
					} // end cycle through the sets
				} // end of just look at sets
			} // End of cycle through the attributes in the set (traverse the set)

			return attributeValues;
		}

		// This temp array will hold the values of a multi-value attribute, in a multi-value set
		// Later, this temp array will be pushed onto the main array being returned
		tempArray = new Array();

		// cycle through the attributes in the set (traverse the set)
		for ( attid in thisNode[ categoryId ].attr_data ) {
			// Just look at a set
			if ( thisNode[ categoryId ].attr_data[ attid ].set == true ) {
				// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
				for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
					// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
					for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
						if ( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].name == attribute ) {
							if ( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].multi == true ) {
								// cycle through the values array
								for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values ) {
									// multi-value attribute
									tempArray.push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ valpairs ][ 1 ] );
								} // end of cycle through the values array
							} else {
								// regular attribute
								attributeValues.push( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ 0 ][ 1 ] );
							}
						}

						if ( tempArray.length > 0 ) {
							// Multi-value attribute found in the set, push these attribute values to the array
							attributeValues.push( tempArray );
							tempArray = new Array();			// Clear the tempArray
						}
					} // end cycle through the attributes in the set
				} // end cycle through the sets
			} // end of just look at sets
		} // End of cycle through the attributes in the set (traverse the set)

		if ( attributeValues.length > 0 ) {
			return attributeValues;
		} else {
			// An attribute with the display name specified was not found
			return attributeValues;
		}
	}

	// Return the value(s) of an attribute based on the display name of the form field
	// Takes arguments: categoryId (required), attribute (required), nodeId (required)
	// Attribute is the display name of the form field in the format - _x_x_x ... where 'x' is a number
	// Will always return just 1 value because display name of the form field is a unique identifier.
	//
	catData.prototype.getAttrValueByFormField = function( categoryId, attribute, nodeId ) {
		var attributeValue;			// Attribute value to return

		// Check that nodeId is valid and exists in the array
		if ( this.nodes[ nodeId ] == null ) {
			// nodeId is not found in the JS array
			return null;
		}

		thisNode = this.nodes[nodeId];

		// Check that categoryId is valid and exists in the array
		if ( thisNode[ categoryId ] == null ) {
			// categoryId is not found in the JS array
			return null;
		}

		// cycle through the attributes
		for ( attid in thisNode[ categoryId ].attr_data ) {
			// just look at regular attributes and multi-value attributes in this branch
			if ( thisNode[ categoryId ].attr_data[ attid ].set == false ) {
				// cycle through the values array
				for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].values ) {
					if ( thisNode[ categoryId ].attr_data[ attid ].values[ valpairs ][ 0 ] == attribute ) {
						// Found the attribute value, return
						attributeValue = thisNode[ categoryId ].attr_data[ attid ].values[ valpairs ][ 1 ];
						return attributeValue;
					}
				} // end of cycle through the values array
			// look at a set or a multi-value set in this branch
			} else {
				// cycle through the sets - one itteration for a regular set and multiple for multi-value sets (I.e. 0,1,etc.)
				for ( set in thisNode[ categoryId ].attr_data[ attid ].attr_data ) {
					// cycle through the attributes in the set (I.e. 6,7,8,9,etc)
					for ( setattr in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ] ) {
						// cycle through the values array
						for ( valpairs in thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values ) {
							if ( thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ valpairs ][ 0 ] == attribute ) {
								// Found the attribute value, return
								attributeValue = thisNode[ categoryId ].attr_data[ attid ].attr_data[ set ][ setattr ].values[ valpairs ][ 1 ];
								return attributeValue;
							}
						} // end of cycle through the values array
					} // end cycle through the attributes
				} // end cycle through the sets
			} // end of else statement
		} // cycle through the attributes

		// Attribute was not found in the cat_data structure
		return null;
	} // End of getAttrValueByFormField function
