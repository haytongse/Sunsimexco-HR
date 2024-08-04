import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Layout from '../component/layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainText from '../component/text/MainText';
import ComposePicker from '../component/datePicker/ComposePicker';
import Colors from '../component/colors/Colors';
import Button from '../component/button/Button';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Loading from '../component/loading/Loading';
import { request } from '../util/request';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../component/images/Images';
import { image_path } from '../util/service';
const HistoryByMonth = ({ navigation }) => {
  const { profile } = useSelector(state => state.profile);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
  const [selectDate, setSelectDate] = useState('ថ្ងៃចាប់ផ្តើម');
  const [selectDateEnd, setSelectDateEnd] = useState('បញ្ចប់');
  const [loading, setLoading] = useState(false);
  const [attDate, setAttDate] = useState('');
  useEffect(() => {
    searchAtt();
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePickerEnd = () => {
    setDatePickerVisibilityEnd(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEnd(false);
  };
  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    // console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setSelectDate(x1[0] + '-' + x1[1] + '-' + x1[2]);
    hideDatePicker();
  };
  const handleConfirmEnd = (date) => {
    // console.warn("A date has been picked: ", date);
    const dt = new Date(date);
    const x = dt.toISOString().split('T');
    // const x1 = x[0];
    const x1 = x[0].split('-');
    // console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
    setSelectDateEnd(x1[0] + '-' + x1[1] + '-' + x1[2]);
    hideDatePickerEnd();
  };
  const searchAtt = async () => {
    var param = {
      id: profile?.id,
      from_date: selectDate,
      to_date: selectDateEnd
    }
    //api login
    setLoading(true);
    await request("attendance_by_date.php", "POST", param).then(res => {
      setLoading(false);
      if (res) {
        setAttDate(res);
      } else {
        console.log("Date Not Found!");
      }
    }).catch(err => {
      console.log(err);
    });

  }
  return (
    <Layout loading={loading}>
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={25}
          color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
          onPress={() => navigation.goBack()}
        />
        <MainText title='វត្តមាន​ ប្រចាំខែ' type='default' />
      </View>
      <View style={styles.DateContainer}>
        <View style={{ width: '15%' }}>
          <MainText title='ចាប់ផ្តើម' type='default' pr={10} />
        </View>
        <TouchableOpacity
          onPress={() => { showDatePicker() }}
          style={styles.DateTimetxt}>
          <Text style={{ fontSize: 16, }}>{selectDate}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.DateContainer}>
        <View style={{ width: '15%' }}>
          <MainText title='បញ្ចប់' type='default' pr={10} />
        </View>
        <TouchableOpacity
          onPress={() => { showDatePickerEnd() }}
          style={styles.DateTimetxt}>
          <Text style={{ fontSize: 16, }}>{selectDateEnd}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisibleEnd}
        mode="date"
        onConfirm={handleConfirmEnd}
        onCancel={hideDatePickerEnd}
      />
      <Button title={"ស្វែងរក"} type='default' onPress={() => searchAtt()} />
      <View style={styles.attContainer}>
        <MainText title='សម្រង់វត្តមាន​ ប្រចាំខែ' type='title' />
        <View style={{ width: '100%', height: 1, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
        {attDate.result != 'ko' ?
          <FlatList
            data={attDate}
            renderItem={({ item, index }) => {
              let meter = item.meter_scan;
              let allow = parseInt(item.allow_size_scan);
              return (
                <View key={index}>
                  <View style={styles.Itemlist} >
                    <MainText title={index + 1 + '.'} type='default' />
                    <MainText title={item.project_name} pl={2} type="default"
                      style={{ backgroundColor: Colors.DEFAULT_ORANGE, color: Colors.DEFAULT_WHITE }} />
                    <MainText style={styles.rowScanTime_row} title={item.date_scan} type="default" pl={2} />
                    <View style={styles.rowScanTime}>
                      <MainText title={item.time_scan} type="default" pr={5} />
                      <MainText title={item.state} type="default" pr={5} />
                      {/* <MainText title={item.useradd} type="default" pr={5} /> */}
                      {meter > allow ?
                        <MainText pr={5} style={styles.strikeThroughtextStyle} title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="default" />
                        : (
                          <MainText title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="default" pr={5} />
                        )}
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 0.4, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                </View>

              );
            }}
          />
          : (
            <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
              <Image source={Images.LOGO} resizeMode='contain' style={{ width: 200, height: 200, opacity: 0.1 }} />
              <MainText style={{ color: Colors.DEFAULT_RED }} title='មិនមានទិន្នន័យ!' type='title' />
            </View>

          )}

      </View>
    </Layout>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  DateContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  DateTimetxt: {
    width: '80%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.DEFAULT_ORANGE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  attContainer: {
    height: '68%',
    marginTop: 20,
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 5,
    borderColor: Colors.DEFAULT_ORANGE,

  },
  Itemlist: {
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_GREY,
    marginTop: 5
  },
  rowScanTime_row: {
    justifyContent: "space-between",
  },
  rowScanTime: {
    flexDirection: "row",
    marginLeft: 4
  },
  strikeThroughtextStyle: {
    textDecorationLine: 'line-through',
    color: Colors.DEFAULT_RED
  }
});
export default HistoryByMonth;
