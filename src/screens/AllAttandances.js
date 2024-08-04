import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, ScrollView } from 'react-native';
import Layout from '../component/layout/Layout'
import MainText from '../component/text/MainText'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../component/colors/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../component/input/InputText';
import Button from '../component/button/Button';
import Loading from '../component/loading/Loading';
import Images from '../component/images/Images';
import { request } from '../util/request';
import FastImage from 'react-native-fast-image';
const AllAttandances = ({ navigation }) => {
  const { profile } = useSelector(state => state.profile);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
  const [selectDate, setSelectDate] = useState('ថ្ងៃចាប់ផ្តើម');
  const [selectDateEnd, setSelectDateEnd] = useState('បញ្ចប់');
  const [employees, setEmplyees] = useState('');
  const [loading, setLoading] = useState(false);
  const [attAll, setAttAll] = useState('');
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
  const searchAttByEmp = async () => {
    if (selectDate == 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd == 'បញ្ចប់' && employees == "") {
      setLoading(true);
      await request("getAllAttendances.php", "POST", {}).then(res => {
        setLoading(false);
        if (res) {
          setAttAll(res);
        } else {
          console.log("Data Not Found!");
        }
      }).catch(err => {
        console.log(err);
      });
    } else if (selectDate != 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd != 'បញ្ចប់' && employees == "") {
      var param = {
        empname: employees,
        from_date: selectDate,
        to_date: selectDateEnd
      }
      setLoading(true);
      await request("getAllAttendances.php", "POST", param).then(res => {
        setLoading(false);
        if (res) {
          setAttAll(res);
        } else {
          console.log("Data Not Found!");
        }
      }).catch(err => {
        console.log(err);
      });
    } else if (selectDate != 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd != 'បញ្ចប់' && employees != "") {
      var param = {
        empname: employees,
        from_date: selectDate,
        to_date: selectDateEnd
      }
      setLoading(true);
      await request("getAllAttendances.php", "POST", param).then(res => {
        setLoading(false);
        if (res) {
          setAttAll(res);
        } else {
          console.log("Data Not Found!");
        }
      }).catch(err => {
        console.log(err);
      });
    } else if (selectDate == 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd == 'បញ្ចប់' && employees != "") {
      var param = {
        empname: employees
      }
      setLoading(true);
      await request("getAllAttendances.php", "POST", param).then(res => {
        setLoading(false);
        if (res) {
          setAttAll(res);
        } else {
          console.log("Data Not Found!");
        }
      }).catch(err => {
        console.log(err);
      });
    }

  }
  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={25}
          color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
          onPress={() => navigation.goBack()}
        />
        <MainText title='វត្តបុគ្គលិកទាំងអស់' type='default' />
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
      <View style={styles.txtContainer}>
        <InputText placeholder={'បញ្ចូលឈ្មោះបុគ្គលិក...'} onChangeText={(text) => { setEmplyees(text) }} />
        <Button type='default' title={'ស្វែងរក'} size='md' onPress={() => { searchAttByEmp() }} />
      </View>
      <View style={styles.empContainer}>
        <MainText title='សម្រង់វត្តមាន​ ពត៌មានបុគ្គលិកទាំងអស់' type='title' />
        <View style={{ width: '100%', height: 1, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 8 }}></View>
        <View style={styles.ItemHeaderlist}>
          <MainText title="សាខា" style={{ color: Colors.DEFAULT_WHITE }} />
          <MainText title="ថ្ងៃខែឆ្នាំ" style={{ color: Colors.DEFAULT_WHITE }} />
          <View style={styles.rowScan}>
            <MainText title="ម៉ោងចូល/ចេញ" pr={'32%'} style={{ color: Colors.DEFAULT_WHITE }} />
          </View>
        </View>
        {attAll?.result != 'ko' ?
          <FlatList
            data={attAll}
            renderItem={({ item, index, separators }) => {
              var id = item.id;
              let meter = item.meter_scan;
              let allow = parseInt(item.allow_size_scan);
              return (
                <ScrollView>
                  <View key={index} loading={loading}>
                    <View style={styles.Itemlist} >
                      <MainText title={index + 1 + '.'} />
                      <MainText title={item.project_name} pl={2} type="s_small" style={{ backgroundColor: Colors.DEFAULT_ORANGE, width: 50, color: Colors.DEFAULT_WHITE }} />
                      <MainText style={styles.rowScanTime_row} title={item.date_scan} type="s_small" />
                      <View style={styles.rowScanTime}>
                        <MainText title={item.time_scan} type="s_small" pr={5} />
                        <MainText title={item.state} type="s_small" pr={5} />
                        <MainText title={item.useradd} type="s_small" pr={5} />
                        {meter > allow ?
                          <MainText pr={5} style={styles.strikeThroughtextStyle} title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" />
                          : (
                            <MainText title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" pr={5} />
                          )}
                      </View>
                    </View>
                    <View style={{ width: '100%', height: 0.7, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                  </View>
                </ScrollView>
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

export default AllAttandances;
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
  txtContainer: {
    marginBottom: 10
  },
  empContainer: {
    height: '58%',
    marginTop: 20,
    borderWidth: 0.5,
    padding: 4,
    borderRadius: 5,
    borderColor: Colors.DEFAULT_ORANGE,
  },
  ItemHeaderlist: {
    flexDirection: "row",
    // marginTop: 15,
    backgroundColor: Colors.DEFAULT_ORANGE,
    padding: 5,
    justifyContent: "space-between",
  },
  Itemlist:{
    width: '100%',
    flexDirection: "row",
    backgroundColor: Colors.DEFAULT_GREY,
    padding: 3,
  },
  rowScanTime_row:{
    justifyContent: "space-between",
  },
  rowScanTime:{
    flexDirection: "row",
  },
  strikeThroughtextStyle:{
    textDecorationLine: 'line-through',
    color: Colors.DEFAULT_RED
  }
});