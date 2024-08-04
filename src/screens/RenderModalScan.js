import React from 'react'
import { Text, View } from 'react-native'

const RenderModalScan = ()=> {
  return (
      <View>
        <Text>Test</Text>
        {/* {qrvalue == '' ?
          <CameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={Colors.DEFAULT_ORANGE}
            frameColor={Colors.DEFAULT_ORANGE}
            colorForScannerFrame={'transparent'}
            // ref={(ref) => (this.camera = ref)}
            // cameraType={CameraType.Back}
            onReadCode={() => onBarcodeScan(nativeEvent.codeStringValue)
            }
          />
          : <>
            <View style={styles.container}>
              <MainText title={'ស្គែន​ វត្តមាន'} type='main_title' />
              <TouchableOpacity style={styles.profileImgContainer}>
                <View>
                  <Image source={{ uri: `${image_path + profile?.image}` }} style={styles.profileImg} />
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 5, marginBottom: 10, }}>
                <MainText title={profile?.name} type='main' />
              </View>
              {qrvalue == null ?
                <>
                  <MainText title='Please Scan QR Code' type='main' numberOfLines={1} />
                </>
                :
                <>

                  {qrvalue ? (
                    <View>
                      <MainText title={"សាខា - BU: " + qrvalue} type='main' numberOfLines={2} />
                      <MainText title={"ថ្ងៃខែចេញ/ចូល: " + currentDate} numberOfLines={2} />
                      <MainText title={"ម៉ោងចេញ/ចូល: " + currentTime} onChangeText={(text) => { setCurrentTime(text) }} />
                      {meter <= project?.size_scan ? (
                        <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_SUCCESS }} />
                      ) : (
                        <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_RED }} />
                      )}

                    </View>
                  )
                    : <>
                    </>}
                  {qrvalue.includes('https://') ||
                    qrvalue.includes('http://') ||
                    qrvalue.includes('http://') ||
                    qrvalue.includes('@') ||
                    qrvalue.includes('geo:') ? (
                    <TouchableOpacity onPress={onOpenlink}>
                      <MainText style={styles.textLinkStyle}
                        title={
                          qrvalue.includes('geo:') ?
                            'Open in Map' : 'Open Link'
                        }
                      />
                    </TouchableOpacity>
                  ) :
                    <View style={styles.btnChekin}>
                      {message.result == 'wrong' || message.result == '' ?
                        <>
                          <ModalPoup
                            visible={visibleSmall}
                          >
                            <View style={{ alignItems: 'center' }}>
                              <View style={styles.header}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                  <Ionicons name="close" size={30} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                              <Entypo name="circle-with-cross" size={100} color={Colors.DEFAULT_RED} />
                            </View>
                            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                              សូមពិនិត្យ​ មើលសាខា​ឡើងវិញ​!
                            </Text>
                          </ModalPoup>
                        </>
                        : (
                          <>

                            <View style={styles.btnChekin}>
                              {message.result == 'wrong' || message.result == '' ?
                                <>
                                  <ModalPoup visible={visibleSmall}>
                                    <View style={{ alignItems: 'center' }}>
                                      <View style={styles.header}>
                                        <TouchableOpacity onPress={() => setVisible(false)}>
                                          <Ionicons name="close" size={30} />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                      <Entypo name="circle-with-cross" size={100} color={Colors.DEFAULT_RED} />
                                    </View>
                                    <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                                      សូមពិនិត្យ​ មើលសាខា​ឡើងវិញ​!
                                    </Text>
                                  </ModalPoup>
                                </>
                                : (
                                  <>
                                  </>
                                )}
                              {profile?.role_as == 1 ? (
                                <>
                                  {isButtonDisabled === false ?
                                    <Button title={"Check in me"}
                                      type='default'
                                      disabled={isButtonDisabled}
                                      onPress={onSave}
                                      iconRight={<MaterialIcons name="check-circle-outline"
                                        size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                                    :
                                    <Button title={"Sending...  "} type='danger'
                                      disabled={isButtonDisabled}
                                      iconLeft={
                                        <ActivityIndicator size={20} color={Colors.DEFAULT_WHITE} animating />
                                      }
                                    />
                                  }

                                </>
                              ) : (
                                <>
                                  {meter <= project?.size_scan ? (
                                    <>
                                      {isButtonDisabled === false ?
                                        <Button title={"Check in me"}
                                          type='default'
                                          disabled={isButtonDisabled}
                                          onPress={onSave}
                                          iconRight={<MaterialIcons name="check-circle-outline"
                                            size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                                        :
                                        <>
                                          <Button
                                            title={"Sending...  "}
                                            type='danger'
                                            disabled={isButtonDisabled}
                                            iconLeft={
                                              <ActivityIndicator size={20} color={Colors.DEFAULT_WHITE} animating />
                                            } />
                                        </>
                                      }
                                    </>
                                  ) : (
                                    <View style={{ width: 210, justifyContent: 'center', alignSelf: 'center' }}>
                                      <MainText title={"អនុញ្ញាត្តិត្រឹមតែ " + project?.size_scan + "ម៉ែត្រ" + "​ ពីសាខារបស់អ្នក!"} type='small' />
                                    </View>
                                  )}
                                </>
                              )}
                            </View>
                          </>
                        )}
                    </View>

                  }
                </>
              }
            </View>
          </>} */}
      </View>
    );
}
export default RenderModalScan;
