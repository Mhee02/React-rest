// import { Language } from '@mui/icons-material';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "createuser": "Create User",
      "firstname": "First Name",
      "lastname": "Last Name",
      "age": "Age",
      "action": "Action" ,
      "submit": "Submit",
      "user": "User",
      "edit": "Edit",
      "delete":"Del",
      "create":"Create",
      "home": "Home",
      "contact": "Contact",
      "list": "List",
      "currentlocation": "Current Location",
      "searchbyname": "Search by Name",
      "clear": "Clear",
      "location": "Location",
      "hidemap": "Hide Map",
      "showmap": "Show Map",
      "update": "Update"


    }
  },
  th: {
    translation: {
      "welcome": "ยินดีต้อนรับ",
      "createuser": "สร้างผู้ใช้งาน",
      "firstname": "ชื่อจริง",
      "lastname": "นามสกุล",
      "age": "อายุ",
      "submit": "ยืนยัน",
      "user": "รายชื่อผู้ใช้งาน",
      "action": "จัดการ",
      "edit":"แก้ไข",
      "delete":"ลบ",
      "create":"เพิ่ม",
      "home": "หน้าแรก",
      "contact": "ผู้ติดต่อ",
      "list": "รายชื่อผู้ติดต่อ",
      "currentlocation": "ตำแหน่งปัจจุบัน",
      "searchbyname": "ค้นหารายชื่อ",
      "clear": "ล้างรายการ",
      "location": "ตำแหน่ง",
      "hidemap": "ซ่อนแผนที่",
      "showmap": "แสดงแผนที่",
      "update": "เพิ่ม"


    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: window.location.pathname.split('/')[1] || "en", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });
  export default i18n;
