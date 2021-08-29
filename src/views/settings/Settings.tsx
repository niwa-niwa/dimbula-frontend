import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableCell,
} from "@material-ui/core";
import { selectUser, asyncDeleteUser } from "../../slices/userSlice";
import SelectDialog from "../layouts/SelectDialog";

const MainContainer = styled(Container)`
  position: relative;
  height: 80vh;
  padding-top: 32px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 32px;
`;

const CustomCell = styled(TableCell)`
  border: none;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const Settings = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectUser);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onDelete = () => {
    dispatch(asyncDeleteUser());
  };

  return (
    <MainContainer maxWidth="sm">
      <Title>User Information</Title>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <CustomCell align="right">Name</CustomCell>
              <CustomCell align="center">
                {userInfo.name || "no name"}
              </CustomCell>
            </TableRow>
            <TableRow>
              <CustomCell align="right">E-mail</CustomCell>
              <CustomCell align="center">
                {userInfo.email || "no email"}
              </CustomCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteButton
        color="secondary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        Delete Account.
      </DeleteButton>

      <SelectDialog
        isOpen={isOpen}
        onClose={() => onClose()}
        title="Are You Sure ?"
        subtitle="You are going to delete your account .
        It will delete all your data permanently"
        OnCallback={() => onDelete()}
      />
    </MainContainer>
  );
};
export default Settings;
