const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_REQ_MAX = 'REQUIRE_MAXLENGTH'

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_REQ_MAX = val =>({type: VALIDATOR_TYPE_REQ_MAX, val:val})

export const validate = (value, validators) => {
  let isValid = true;
  let errorType = ''
  for (const validator of validators) {
   
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
     
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if(validator.type === VALIDATOR_TYPE_REQ_MAX){
      isValid = isValid && value.trim().length > 0 && value.trim().length <= validator.val;
      if(value.trim().length > 0 === true){
          errorType = 'Description cannot be more than 50 characters'
      }else if( value.trim().length <= validator.val){
        errorType = 'title cannot be empty'
      }
    }
  }
  return {isValid,errorType};
};
