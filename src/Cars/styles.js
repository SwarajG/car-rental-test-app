import { css } from 'emotion';

const menuWrapper = css`
  position: fixed;
  z-index: 100;
  width: 100%;
  background: #2196F3;
  top: 50px;
`;

const carsWrapper = css`
  display: flex;
  min-height: 100vh;
  margin-left: auto;
  @media screen and (max-width: 580px) {
    flex-direction: column;
  }
`;

const carsList = css`
  min-height: 100vh;
  overflow: auto;
  width: 75%;
  margin-left: auto;
  @media screen and (max-width: 580px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const carCardWrapper = css`
  display: flex;
  min-height: 140px;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 580px) {
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    padding-bottom: 20px;
  }
`;

const carImage = image => css`
  background: url(${image}) center center no-repeat;
  background-size: cover;
  width: 200px;
  height: auto;
  flex: 1;
  @media screen and (max-width: 580px) {
    height: 150px;
  }
`;

const filtersList = css`
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
  padding-top: 50px;
  border-right: 1px solid black;
  position: fixed;
  height: 100vh;

  @media screen and (max-width: 580px) {
    top: 0;
    display: none;
    width: 100%;
  }
`;

const filterWrapper = css`
  div {
    display: flex;
    flex-direction: column;
  }
  margin-bottom: 20px;
  min-width: 200px;
`;

const carDetail = css`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

const carName = css`
  font-size: 19px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const carDetailsList = css`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 580px) {
    flex-direction: column;
    flex-flow: wrap;
  }
`;

const cardPrice = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const priceText = css`
  font-size: 24px;
  margin-bottom: 5px;
`;

const detailWrapper = css`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const detailHeader = css`
  margin-bottom: 3px;
  font-weight: 600;
`;

const displayFlex = css`
  display: flex;
  padding: 20px;
  flex-flow: wrap;

  div {
    min-height: 100px;
  }
`;

const iconWrapper = css`
  position: fixed;
  background: white;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  z-index: 100;
`;

export default {
  carsWrapper,
  carCardWrapper,
  carImage,
  carsList,
  filtersList,
  filterWrapper,
  carDetail,
  carName,
  carDetailsList,
  cardPrice,
  priceText,
  detailWrapper,
  detailHeader,
  menuWrapper,
  displayFlex,
  iconWrapper
}