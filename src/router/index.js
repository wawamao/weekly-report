import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/selectlogin';
import Signup from '@/components/signup';
import Main from '@/components/main';
import Input from '@/components/input';
import CurrWeekSummary from '@/components/currweek-summary';
import HistorySummary from '@/components/history-summary';
import ReportSummary from '@/views/report-summary';
import UserSetting from '@/components/usersetting';
import Admin from '@/components/admin';
import Verify from '@/views/Verify';
import ForgetPwd from '@/views/ForgetPwd';
import GroupWeekReport from '@/views/GroupWeekReport';
import GroupMonthReport from '@/views/GroupMonthReport';
import GroupAdmin from '@/views/GroupAdmin';
import GroupReport from '@/views/GroupReport';

import api from '@/api';

// 验证通过要求
function verifyRequired(to, from, next) {
  api.getCurrUserAsync().then(user => {
    // 未登录或未验证禁止访问
    if (!user || user.attributes.verify !== true) {
      next('/');
    } else {
      next();
    }
  });
}

// admin require
function adminRequired(to, from, next) {
  api.getCurrUserAsync().then(user => {
    // 未登录或未验证禁止访问
    if (!user || user.attributes.isAdmin !== true) {
      // next('/');
    } else {
      next();
    }
  });
}

Vue.use(Router);

const router = new Router({
  // 切换时滚动处理
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/forgetpwd',
      name: 'forgetpwd',
      component: ForgetPwd
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter: verifyRequired,
      children: [{
          path: 'input',
          name: 'input',
          component: Input
        },
        {
          path: 'summary',
          name: 'summary',
          hasChart: true,
          component: CurrWeekSummary
        },
        {
          path: 'history',
          name: 'history',
          hasChart: true,
          component: HistorySummary
        },
        {
          path: 'report',
          name: 'report',
          hasChart: true,
          component: ReportSummary
        },
        {
          path: 'usersetting',
          name: 'usersetting',
          component: UserSetting
        },
        {
          path: 'admin',
          name: 'admin',
          component: Admin,
          beforeEnter: adminRequired
        },
        {
          path: 'verify',
          name: 'verify',
          component: Verify,
          beforeEnter: adminRequired
        },
        {
          path: 'groupAdmin',
          name: 'groupAdmin',
          component: GroupAdmin,
          beforeEnter: adminRequired
        },
        {
          path: 'GroupWeekReport',
          name: 'groupWeekReport',
          component: GroupWeekReport
        },
        {
          path: 'GroupMonthReport',
          name: 'groupMonthReport',
          component: GroupMonthReport
        },
        {
          path: 'GroupSummary',
          name: 'GroupSummary',
          component: GroupReport
        }
      ]
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   console.log('before');
//   console.log(to, from, next);
//   next();
// });
// router.afterEach((to, from) => {
//   console.log('after');
//   console.log(to, from);
// });
export default router;
