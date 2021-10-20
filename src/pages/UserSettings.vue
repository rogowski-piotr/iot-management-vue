<template>
  <Navbar/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <div class="col-md-9 ml-sm-auto col-lg-10 p-4">

        <h3>User Settings</h3>
        <hr/>

        <div v-if="updateStatus != null" class="alert alert-warning text-center" role="alert" id="alert-invalid-data">
            <h4 class="alert-heading">❌ Can not update! ❌</h4>
            <div v-for="msg in errorMessage" :key="msg.id">
                <hr>
                {{ msg }}
            </div>
        </div>
        
        <div class="col-lg-6 offset-lg-2">

          <div class="text-left mb-4">
            <h4>New Password</h4>
          </div>

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Current password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="resetPasswordPayload.currentPassword">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">New password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="resetPasswordPayload.newPassword">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <th scope="row">Repeat new password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="repeatedPassword">
                    </td>
                </tr>
            </table>

            <br/>
            <div class="text-center mb-5">
                <button @click="updatePassword" type="button" class="btn btn-primary">Update Password</button>
            </div>

        </div>
        <hr/>
        <div class="col-lg-6 offset-lg-2">

            <div class="text-left mb-4">
              <h4>Delete account</h4>
              Once you delete your account, there is no going back. Please be certain.
            </div>

            <table class="table table-hover text-left">
                <tr>
                    <td></td>
                    <th scope="row">Confirm password</th>
                    <td></td>
                    <td>
                        <input type="password" class="form-control" v-model="deleteAccountConfirmationPassowrd">
                    </td>
                </tr>
            </table>

            <div class="text-center">
                <button @click="update" type="button" class="btn btn-danger">Delete account</button>
            </div>

        </div>
          
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import router from '../helpers/router';
import { userService } from '../services';

export default {
  components: { Navbar, Sidebar },
  data () {
      return {
          resetPasswordPayload: {
              email: null,
              currentPassword: null,
              newPassword: null
          },
          repeatedPassword: null,
          deleteAccountConfirmationPassowrd: null,
          updateStatus: null,
          errorMessage: '',
      }
  },
  methods: {
      updatePassword() {
          this.resetPasswordPayload.email = userService.getCurrentUser().email
          if (! this.isPasswordValid()) {
              this.updateStatus = 400
              this.errorMessage = ['Passwords are not the same']
              return;
          }
          userService.updatePassword(this.resetPasswordPayload)
              .then(response => {
                  this.updateStatus = response.status
                  if (response.status === 202) {
                      router.push("/login")
                  } else {
                      return response.json()
                  }
              })
              .then(errorMsg => this.errorMessage = this.parseErrorMsg(errorMsg))
      },
      parseErrorMsg(errorMsg) {
          if (errorMsg === undefined) return;
          var msg = [];
          var keys = Object.keys(errorMsg);
          keys.forEach(function(key) {
              msg.push(key + ' ' + errorMsg[key]);
          });
          return msg;
      },
      isPasswordValid() {
          return this.resetPasswordPayload.newPassword == this.repeatedPassword
      }
  }
};
</script>
