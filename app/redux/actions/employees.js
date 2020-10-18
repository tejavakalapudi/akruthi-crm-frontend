import employeesService from '../../services/employeesService';
import * as types from '../../constants/actionTypes';

const setEmployees = (payload) => ({
  type: types.SET_EMPLOYEES,
  payload,
});

const getAllEmployees = () => async (dispatch) => {
  const employeesFetched = await employeesService.getAllEmployees();
  return dispatch(setEmployees(employeesFetched.data));
};

export default { getAllEmployees };
