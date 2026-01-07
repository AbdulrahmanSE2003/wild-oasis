import styled from "styled-components";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-right: auto;
`;

const Avatar = styled.img`
  display: block;
  width: 2.8rem;
  cursor: pointer;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Name = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

export default function UserAvatar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  return (
    <StyledUserAvatar>
      <Avatar
        onClick={() => navigate("/account")}
        src={avatar || "default-user.jpg"}
        alt={`avatar of ${fullName}`}
      />
      <Name>{fullName}</Name>
    </StyledUserAvatar>
  );
}
