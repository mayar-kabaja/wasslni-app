import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Loader, Map, Property } from '../../components';
import UserContext from '../../context/userContext';
import { Text, View } from 'react-native';

function ParcelDetails({ route, navigation }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [mapRoute, setMapRoute] = useState([]);
  const {
    user: { isSeller },
  } = useContext(UserContext);
  const { id } = route.params;
  const getDetails = async () => {
    try {
      const response = await axios.get(
        `https://wasslni.herokuapp.com/api/v1/parcels/${id}`
      );

      if (response.data.message === 'parcels uploaded successfully') {
        setLoading(false);
        setData(response.data.data);
        setMapRoute(JSON.parse(response.data.data.coordinates));
      }
    } catch (error) {
      if (error.response.status === 404) {
        setMessage('لا يوجد طرد ');
        setLoading(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getDetails();

    return () => setMapRoute([]);
  }, [id]);
  console.log(navigation);
  return (
    <Text>
      {mapRoute.length ? (
        <>
          {' '}
          <Card>
            <Property keyWord="الزبون" value={data.name} />
            <Property
              keyWord="الحالة"
              value={data.status ? 'تم التسليم' : 'لم يتم التسليم'}
            />
            <Property keyWord="رقم الزبون" value={data.phonenumber} />
            <Property keyWord="سعر الطرد بالشيكل " value={data.price} />
            <Property
              keyWord="تكاليف التوصيل بالشيكل"
              value={data.deliveryprice}
            />
            <Property
              keyWord="زمن التوصيل بالدقيقة"
              value={data.duration_mins}
            />
          </Card>
          <Map data={mapRoute} />
        </>
      ) : (
        <Loader />
      )}
    </Text>
  );
}

export default ParcelDetails;
