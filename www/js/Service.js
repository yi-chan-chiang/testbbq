(function () {
    var app = angular.module('myService', ['ngQueue']);
    app.service('localStorageService', ['$http', function ($http, $q) {
        var vm = this;

        vm.getProperty = function (propertyName) {
            var result = [];
            //var getPromise = getProperty.promise;
            //if (propertyName == "menuList") {
            //    //讀取JSON

            //    //result = vm.getJson();
            //    //console.log(result);
            //    return result;
            //    //result = [{ "name": "大魷魚", "vnname": "Yóuyú", "price": 100, "id": 1, "class": 1 }, { "name": "雞腿", "vnname": "Jītuǐ", "price": 70, "id": 2, "class": 1 }, { "name": "香雞排", "vnname": "Jī pái", "price": 60, "id": 3, "class": 1 }, { "name": "牛肉蔥捲", "vnname": "Niúròu cōng juǎn", "price": 45, "id": 4, "class": 1 }, { "name": "豬肉蔥捲", "vnname": "Zhūròu cōng juǎn", "price": 40, "id": 5, "class": 1 }, { "name": "牛條肉", "vnname": "Niú tiáo ròu", "price": 40, "id": 6, "class": 1 }, { "name": "雞腿捲", "vnname": "Jītuǐ juǎn", "price": 35, "id": 7, "class": 2 }, { "name": "小腿排", "vnname": "Xiǎotuǐ pái", "price": 35, "id": 8, "class": 2 }, { "name": "雞肉串", "vnname": "Jīròu chuàn", "price": 35, "id": 9, "class": 2 }, { "name": "翅膀", "vnname": "Jīchì", "price": 30, "id": 10, "class": 2 }, { "name": "肥腸", "vnname": "Féichán", "price": 35, "id": 11, "class": 2 }, { "name": "玉米", "vnname": "Yùmǐ", "price": 35, "id": 12, "class": 2 }, { "name": "一口香腸", "vnname": "Yīkǒu xiāngcháng", "price": 30, "id": 13, "class": 3 }, { "name": "豬五花", "vnname": "Zhū wǔ huā", "price": 30, "id": 14, "class": 3 }, { "name": "尾椎", "vnname": "Qīlǐxiāng", "price": 30, "id": 15, "class": 3 }, { "name": "雞心", "vnname": "Jīxīn", "price": 30, "id": 16, "class": 3 }, { "name": "豬肉蔥串", "vnname": "Zhūròu cōng chuàn", "price": 25, "id": 17, "class": 4 }, { "name": "雞腱", "vnname": "Jī jiàn", "price": 25, "id": 18, "class": 4 }, { "name": "米血", "vnname": "Mǐ xuè", "price": 25, "id": 19, "class": 4 }, { "name": "小肉豆", "vnname": "Xiǎo ròu dòu", "price": 20, "id": 20, "class": 4 }, { "name": "銀絲卷", "vnname": "Yín sī juǎn", "price": 25, "id": 21, "class": 4 }, { "name": "杏鮑菇", "vnname": "Xìng bào gu", "price": 25, "id": 22, "class": 4 }, { "name": "青椒", "vnname": "Qīngjiāo", "price": 25, "id": 23, "class": 4 }, { "name": "麻糬", "vnname": "mochi", "price": 25, "id": 24, "class": 4 }, { "name": "香菇", "vnname": "Xiānggū", "price": 25, "id": 25, "class": 4 }, { "name": "豆皮", "vnname": "Dòu pí", "price": 25, "id": 26, "class": 4 }, { "name": "黃甜", "vnname": "Huáng tián", "price": 25, "id": 27, "class": 4 }, { "name": "牛肉串", "vnname": "Niúròu chuàn", "price": 20, "id": 28, "class": 5 }, { "name": "羊肉串", "vnname": "Yángròu chuàn", "price": 20, "id": 29, "class": 5 }, { "name": "豬肉串", "vnname": "Zhūròu chuàn", "price": 20, "id": 30, "class": 5 }, { "name": "鱈魚丸", "vnname": "Xuěyú wán", "price": 20, "id": 31, "class": 5 }, { "name": "花枝丸", "vnname": "Huāzhī wán", "price": 20, "id": 32, "class": 5 }, { "name": "四季豆", "vnname": "Sìjì dòu", "price": 20, "id": 33, "class": 5 }, { "name": "百頁豆腐", "vnname": "Bǎi yè dòufu", "price": 20, "id": 34, "class": 5 }, { "name": "米腸", "vnname": "Mǐ cháng", "price": 20, "id": 35, "class": 5 }, { "name": "雞皮", "vnname": "Jīpí", "price": 20, "id": 36, "class": 5 }, { "name": "白甜", "vnname": "Bái tián", "price": 20, "id": 37, "class": 5 }, { "name": "洋蔥", "vnname": "Yángcōng", "price": 20, "id": 38, "class": 5 }, { "name": "豆干", "vnname": "Dòu gān", "price": 20, "id": 39, "class": 5 }, { "name": "雞脖子", "vnname": "Jī bózi", "price": 10, "id": 40, "class": 6 }, { "name": "黑輪", "vnname": "Hēi lún", "price": 10, "id": 41, "class": 6 }, { "name": "熱狗", "vnname": "Règǒu", "price": 10, "id": 42, "class": 6 }];
            //} else {
            //讀取紀錄
            result = localStorage.getItem(propertyName);
            result = result || "[]";
            // if (propertyName == "offlineCheckList") {
            //     return result;
            // } else {
            return angular.fromJson(result);
            // }

            //return result;
            //return getPromise;
            //}
            //result = result || "[]";
        };
        //var diferred = $q.defer();
        // diferred.resolve(data);
        //return getPromise;
        //return diferred.promise;
        vm.setProperty = function (propertyName, value) {
            // if (propertyName == "offlineCheckList")
            // {
            //    localStorage.setItem(propertyName,value);
            // } else
            // {
            localStorage.setItem(propertyName, angular.toJson(value));
            // }
        };
    }]);
    app.service('languageService', [function () {
        var vm = this;

        vm.getLanguageName = function (lan) {
            var codeString = '';
            switch (lan) {
                case 'vn':
                    codeString = 'vnname'
                    break;
                case 'tw':
                    codeString = 'name'
                    break;
                default:
                    codeString = 'name';
                    break;
            }
            return codeString;
        };
    }]);
    app.service('foodService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/FoodApi/'
        var typeUrl = 'http://192.168.0.100/api/Type/'
        var typeDeleteUrl = 'http://192.168.0.100/api/Type/Delete'

        //#region   取得資料

        vm.getList = function () {
            alert(url);
            //var Json = [];
            return $http.get(url).then(function (response) {alert(response);
                //$rootScope.data.menuList = response;
                return response;
            }, function(err){
                alert(err.status);
            });

            //return Json.Promise;
        };

        vm.gettypeList = function () {

            //var Json = [];
            return $http.get(typeUrl).success(function (response) {
                //$rootScope.data.menuList = response;
                return response;
            });

            //return Json.Promise;
        };
        //#endregion

        //#region   傳資料
        var data = {};
        vm.menuPost = function (data) {
            //傳過來id若是null表示為新增,反之則為修改
            if (data.id == null) {
                swal("完成!", "以成功儲存 " + data.name + "", "success");
                return $http.post(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};

                    swal(
                           {
                               title: "成功！",
                               text: "商品新增成功。",
                               type: "success"
                           }
                           , function () {
                               location.reload();
                           }
                           );


                });
            }
            else {
                return $http.put(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                          {
                              title: "成功！",
                              text: "商品修改成功。",
                              type: "success"
                          }
                          , function () {
                              location.reload();
                          }
                          );

                });
            }
        };
        vm.typePost = function (data) {

            if (data.type == null) {
                swal("完成!", "以成功儲存 " + data.Typename + "", "success");
                return $http.post(typeUrl, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                          {
                              title: "成功！",
                              text: "分類新增成功。",
                              type: "success"
                          }
                          , function () {
                              location.reload();
                          }
                          );

                });
            }
            else {
                return $http.put(typeUrl, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                          {
                              title: "成功！",
                              text: "分類新增成功。",
                              type: "success"
                          }
                          , function () {
                              location.reload();
                          }
                          );

                });
            }
            //var Json = [];

        };

        //#endregion

        //region 刪除資料
        vm.typeDelete = function (data) {
            $http({
                url: 'http://192.168.0.100/api/Type/Delete?id=' + data.Type,
                method: "POST"
            })
            .then(function (response) {
                // success
            },
            function (response) { // optional
                // failed
            });
            //return $http.post(typeDeleteUrl, id).success(function (response) {
            //    return response;
            //});

            //return Json.Promise;
        };

        vm.menuDelete = function (id) {;
            $http({
                url: 'http://192.168.0.100/api/FoodApi/Delete?id=' + data.id,
                method: "POST"
            })
             .then(function (response) {
                 // success
             },
             function (response) { // optional
                 // failed
             });

            //return Json.Promise;
        };


        //endregion





        //黨不住的魅力kiss Radio!!
    }]);
    //如果有一個懷抱勇敢不計代價，別讓我非，將我溫柔豢養，就讓我非，曾經眷戀太陽
    //用你的熱情，讓綁發燒
    app.service('posService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/posApi/'
        vm.postOffline = function (data) {
            return $http.post('http://192.168.0.100/api/posApi2/', data).success(function () {
            });
        }
        vm.postPos = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
        vm.getPos2Status = function () {
            return $http.get('http://192.168.0.100/api/posApi2/').success(function (response) {
                return response;
            });
        };
        vm.getPosStatus = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
    }]);
    app.service('ReportService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/Report/'
        vm.getdata = function (data) {
            url = 'http://192.168.0.100/api/Report/';
            url = url + data;
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.getchartdata = function (data) {
            url = 'http://192.168.0.100/api/Report?what='
            url = url + data;
            return $http.get(url).success(function (response) {
                return response;
            });
        };
    }]);
    app.service('PurChaseService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/Purchase/'
        vm.postPurchase = function (data) {
            if (data.P_Id == null) {
                swal("完成!", "以成功儲存 " + data.Name + "", "success");
                return $http.post(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                           {
                               title: "成功！",
                               text: "商品新增成功。",
                               type: "success"
                           }
                           , function () {
                               location.reload();
                           }
                           );
                });
            }
            else {
                return $http.put(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                          {
                              title: "成功！",
                              text: "商品修改成功。",
                              type: "success"
                          }
                          , function () {
                              location.reload();
                          }
                          );
                });
            }
        }
        vm.postPurchase = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
        vm.getPurList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        
    }]);
    app.service('RawService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/raw/'
        vm.RawDelete = function (NameId) {
            $http({
                url: 'http://192.168.0.100/api/Raw/Delete?NameId=' + NameId,
                method: "Delete"
            })
            .then(function (response) {
                location.reload();
            },
            function (response) {
            });
        };
        vm.postRaw = function (data) {
            if (data.NameId == null) {
                swal("完成!", "以成功儲存 " + data.Name + "", "success");
                return $http.post(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                           {
                               title: "成功！",
                               text: "商品新增成功。",
                               type: "success"
                           }
                           , function () {
                               location.reload();
                           }
                           );
                });
            }
            else {
                return $http.put(url, data).success(function () {
                    //$rootScope.data.menuList = response;
                    var data = {};
                    swal(
                          {
                              title: "成功！",
                              text: "商品修改成功。",
                              type: "success"
                          }
                          , function () {
                              location.reload();
                          }
                          );
                });
            }
        }
        vm.getRawList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.addPqrt = function (data) {
            return $http.put(url, data).success(function (response) {
                return response;
            });
        };
        vm.minusPqrt = function (data) {
            return $http.put(url, data).success(function (response) {
                return response;
            });
        };
    }]);
    app.service('PersonService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/Person/'
        var fireurl = 'http://192.168.0.100/api/Person?AAAA=1'
        vm.getPersonList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.getfirePersonList = function () {

            return $http.get(fireurl).success(function (response) {
                return response;
            });
        };
        vm.getPersonList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.postPerson = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
        vm.MemberDelete = function (Uuid) {
            $http({
                url: 'http://192.168.0.100/api/Person/Delete?Uuid=' + Uuid,
                method: "Delete"
            })
            .then(function (response) {
                location.reload();
            },
            function (response) { 
            });
        };
    }]);
    app.service('ShiftService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/ShiftApi/'
        vm.getShiftList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.postShift = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
    }]);
    app.service('TimeCountService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/TimeCount/'
        vm.getCountList = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.postCount = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
        vm.getOneCountList = function (start, end, uuid) {
            return $http({
                url: 'http://192.168.0.100/api/TimeCount?start=' +start + '&end=' + end + '&uuid=' + uuid,
                method: "Get"
            });
        }
        vm.getTotal = function (start, end, uuid) {
            return $http({
                url: 'http://192.168.0.100/api/aaaaaa?start=' + start + '&end=' + end + '&uuid=' + uuid,
                method: "Get"
            });
        }
    }]);
    app.service('PrintService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/Print/'
        vm.getPrint = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.postPrint = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
    }]);
    app.service('ExpendService', ['$http', function ($http) {
        var vm = this;
        var url = 'http://192.168.0.100/api/Expend/'
        vm.Atotal = function () {
            angular.forEach(vm.ExpendList.A, function (value, key) {
                vm.Acount += vm.ExpendList.A.Count;
                vm.Atot += vm.ExpendList.A.Totle;
            });
        };
        vm.getExpend = function () {
            return $http.get(url).success(function (response) {
                return response;
            });
        };
        vm.postExpend = function (data) {
            return $http.post(url, data).success(function () {
            });
        }
        vm.getYinYaBiao = function (start, end) {
            return $http({
                url: 'http://192.168.0.100/api/Expend?start=' + start + '&end=' + end,
                method: "Get"
            });
        }
    }]);
    //function crudService($resourse) {
    //var src = $resourse('http://192.168.0.100/api/FoodApi/:id:cmd',
    //    { id: "@id", cmd: "@cmd" },
    //    {
    //        getList: { method: "GET", params: {} },
    //        getItem: { method: "GET", params: { id: 0 } },
    //        addItem: { method: "POST", params: { name: "", vnname: "", price: 0, type: 0 } },
    //        editItem: { method: "PATCH", params: {/*...*/ } },
    //        removeItem: { method: "DELETE", params: { id: 0 } },
    //        resetItem: { method: "GET", params: { cmd: "reset" } },
    //    });
}
)();


//看到我的新址住著你一人  如果有意天我走進你的新 看到你心中住的都是別人 我是該哭泣 還是為自己心疼 在我的是解李呼風喚雨 在我的ˊ回憶只有一個你 在我的故事裡 時常不小心 在你的專屬李 我是路人甲而以 在你的生命裡呼風喚雨 在你的眼睛裡 只有一個你 在你的幸福理 我心跳落疑地 如果有意天我走進你的新 看到你心裡都ˋ別人 風吹動了雲 卻四處去 我該哭泣還是為自己心疼 在我的是解力呼風喚雨  在你的專屬理我是路人甲爾以 在你的   
//我緊緊握住的雙手彷彿你就在我懷中 

