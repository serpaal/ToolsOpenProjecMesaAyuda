import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {Op} from "sequelize";

export const Where = createParamDecorator(
  (_keys: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const body = request.body;
    const _keysQuery = [];
    let _where:any = {};

    function  whereFromKeysObject(query){
      Object.keys(query).forEach(k => { 
          _keysQuery[k.toLowerCase()] = k;         
      });
      _keys.forEach(
          k => {
            if (_keysQuery.indexOf[k.toLowerCase()] != -1 && query[_keysQuery[k.toLowerCase()]]){
                  _where[k] = query[_keysQuery[k.toLowerCase()]];
            }           
          }
      );
    }

    function whereFromBody(body){
        Object.keys(body).forEach(k => { 
            _keysQuery[k.toLowerCase()] = k;         
        });
        _keys.forEach(
            k => {
              if (_keysQuery.indexOf[k.toLowerCase()] != -1 && body[_keysQuery[k.toLowerCase()]]){
                    _where[k] = body[_keysQuery[k.toLowerCase()]];
              }           
            }
        );
    }

    function whereFromFilters(object) {
      var isArray = Array.isArray(object);
      for (let key in object) {
          let value = object[key];
          let newKey = key;
          if (!isArray) { // if it is an object
              delete object[key]; // firstly remove the key
              newKey = key; // secondly generate new key 
          }
          let newValue = value;
          if (typeof value != "object") { // if it is not an object (array or object in fact), stops here
              if (typeof value == "string") {
                  newValue = value; 
              }
          } else { // if it is an object, recursively whereFromFilters it
              newValue = whereFromFilters(value);
          }
          switch(key){
              case 'or':
                  Object.assign(object, {[Op.or]: newValue});
                  break;
              case 'and':
                  Object.assign(object, {[Op.and]: newValue});
                  break;
              case 'like':
                  Object.assign(object, {[Op.like]: newValue});
                  break;
              case 'in':
                  Object.assign(object, {[Op.in]: newValue});
                  break;
              case 'notIn':
                  Object.assign(object, {[Op.notIn]: newValue});
                  break;
              case 'gt':
                  Object.assign(object, {[Op.gt]: newValue});
                  break;
              case 'gte':
                  Object.assign(object, {[Op.gte]: newValue});
                  break;
              case 'lt':
                  Object.assign(object, {[Op.lt]: newValue});
                  break;
              case 'lte':
                  Object.assign(object, {[Op.lte]: newValue});
                  break;
              case 'between':
                  Object.assign(object, {[Op.between]: newValue});
                  break;
              case 'iLike':
                  Object.assign(object, {[Op.iLike]: newValue});
                  break;
              case 'substring':
                  Object.assign(object, {[Op.substring]: newValue});
                  break;
              default:
                  object[newKey] = newValue;
              break;
          }
      }
      return object;
    }
    if(body.hasOwnProperty( "filters" )){
      _where = whereFromFilters(JSON.parse(body.filters));
    } else if(query.hasOwnProperty( "filters" )){
        _where = whereFromFilters(JSON.parse(query.filters));
    } else {
      whereFromKeysObject(query);
      whereFromBody(body);
    }
   
    return _where;
  }
);

/**
[Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
[Op.or]: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
[Op.gt]: 6,                // > 6
[Op.gte]: 6,               // >= 6
[Op.lt]: 10,               // < 10
[Op.lte]: 10,              // <= 10
[Op.ne]: 20,               // != 20
[Op.eq]: 3,                // = 3
[Op.is]: null              // IS NULL
[Op.not]: true,            // IS NOT TRUE
[Op.between]: [6, 10],     // BETWEEN 6 AND 10
[Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
[Op.in]: [1, 2],           // IN [1, 2]
[Op.notIn]: [1, 2],        // NOT IN [1, 2]
[Op.like]: '%hat',         // LIKE '%hat'
[Op.notLike]: '%hat'       // NOT LIKE '%hat'
[Op.iLike]: '%hat'         // ILIKE '%hat' (case insensitive) (PG only)
[Op.notILike]: '%hat'      // NOT ILIKE '%hat'  (PG only)
[Op.startsWith]: 'hat'     // LIKE 'hat%'
[Op.endsWith]: 'hat'       // LIKE '%hat'
[Op.substring]: 'hat'      // LIKE '%hat%'
 */

 /* Ejemplos 

 //Peticiones desde el frontend
const filters = {
            or: [
                {
                    and: [
                        { lastname : { like: '%vara%'}},
                        { id: {in: [5,6,7]}}
                    ]                        
                },
                {username: {like: '%ovand%'} }                                               
            ],
            and: [
                { email: {like:'%hotmail%' }}
            ]
        };

const filters_3 = {
    id : { lte: 3}    
};

const filters_2 = {
    created_at : { between: [new Date(2020,02,20), new Date(2020,02,29)]}    
};
*/