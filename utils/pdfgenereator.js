import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for unitsappna
function generatePDF(data){
      const {acepetedApp,titulo,usuariosolicitante,description,idproprietario } = data;
      const doc = new jsPDF();

      doc.text(`A bantu-marketplace tem o prazer de informar que todos os dados do aplicativo
      ${acepetedApp.name} seguem todos os par]ametros da lei de acordo com os termos de uso da bantu, na seção
      de informação, tendo como requerente ${usuariosolicitante.fullName} para o aplicativo do usuário com id :${idproprietario}
      como o título de ${titulo} com a seguinte descrição: ${description}, lembrando que, essa negociação deve ser cumprida
      na data prevista, pois a bantu em coperação com a AGT asegura que em caso de incumprimento,
      a lei do consumidor e os direitos da lei serão aplicados.`, 10, 10);

      doc.save(`${acepetedApp.name}.pdf`);
}

export default generatePDF;
