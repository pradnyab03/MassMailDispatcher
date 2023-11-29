document.addEventListener('DOMContentLoaded', function () {
//Event listener for file input change
    document.getElementById('upload').addEventListener('change', function () {
      let fr = new FileReader();
      fr.readAsText(this.files[0]);
  
      fr.onload = function () {
//split csv content into an array of arrays
        let Arr = fr.result.split(/\r?\n|\n/).map(e => e.split(','));
        window.validno = 0;
        let invalidno = 0;
        window.validMails = [];
  
        Arr.forEach(e => {
          let em = String(e);
          let m = e.map(e => `<td>${e}</td>`);
          let creEle = document.createElement('tr');
          creEle.innerHTML = m;
  
          if (em !== ' ') {
//check if email addresses are valid
            if (em.charAt(em.length - 4) === '.' || em.charAt(em.length - 3) === '.') {
              document.querySelector('#val').appendChild(creEle);
              window.validMails.push(em);
              window.validno = window.validno + 1;
            } else {
              document.querySelector('#inval').appendChild(creEle);
              invalidno = invalidno + 1;
            }
          }
        });
  //update the count of valid and invalid email addresses
        document.querySelector('#validcount').innerHTML = window.validno;
        document.querySelector('#invalidcount').innerHTML = invalidno;
      };
    });
  });
  
  function sendEmail() {
//send an email using email.js or a similar service
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'bornarpradnya1000@gmail.com',
      Password: '657829d9-c9f4-4b9a-8dd6-8324',
      To: 'pradnyab227@gmail.com',
      From: document.querySelector('#from').value,
      Subject: document.querySelector('#subject').value,
      Body: document.getElementById('msg').value,
    }).then(function (message) {
      alert(
        window.validno +
          ' mails have been sent successfully. Press ' +
          message +
          ' to continue'
      );
    });
  }
  